package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/jrbussard/jrland/internal/agones"
	"github.com/jrbussard/jrland/internal/regions"
	"github.com/jrbussard/jrland/internal/storage"
	worldpb "github.com/jrbussard/jrland/proto"
	"github.com/nats-io/nats.go"
	"github.com/redis/go-redis/v9"
	"google.golang.org/protobuf/proto"
)

const (
	chunkSizeX = 16
	chunkSizeY = 128
	chunkSizeZ = 16
)

type config struct {
	addr              string
	dbDSN             string
	redisAddr         string
	redisPassword     string
	natsURL           string
	worldID           string
	regionID          string
	gatewayConsumeURL string
	gatewayHandoffURL string
	streamRadius      int32
	agonesSDKPort     string
	publicWSURL       string
	publicHealthURL   string
	publicWSScheme    string
	handoffGrace      time.Duration
}

type vec3 struct {
	X float64
	Y float64
	Z float64
}

type chunk struct {
	X         int32
	Z         int32
	Version   uint32
	Blocks    []uint32
	Overrides map[int]uint32
}

type playerSession struct {
	mu            sync.Mutex
	conn          *websocket.Conn
	sessionID     string
	character     *storage.Character
	position      vec3
	velocity      vec3
	moveX         float64
	moveZ         float64
	sprint        bool
	yaw           float64
	visibleChunks map[string]struct{}
	handoffTo     string
	handoffAt     time.Time
}

type worldServer struct {
	cfg              config
	store            *storage.Store
	client           *http.Client
	agones           *agones.SDKClient
	registry         *regions.Registry
	nats             *nats.Conn
	upgrader         websocket.Upgrader
	mu               sync.RWMutex
	players          map[string]*playerSession
	chunks           map[string]*chunk
	pendingTransfers map[string]*handoffTransfer
	tick             uint64
}

type consumeTicketRequest struct {
	Ticket string `json:"ticket"`
}

type consumeTicketResponse struct {
	UserID      string `json:"userId"`
	CharacterID string `json:"characterId"`
	WorldID     string `json:"worldId"`
	RegionID    string `json:"regionId"`
	PlayerName  string `json:"playerName"`
}

type issueHandoffRequest struct {
	UserID      string `json:"userId"`
	CharacterID string `json:"characterId"`
	PlayerName  string `json:"playerName"`
	RegionID    string `json:"regionId"`
}

type issueHandoffResponse struct {
	WorldID     string `json:"worldId"`
	RegionID    string `json:"regionId"`
	CharacterID string `json:"characterId"`
	Endpoint    string `json:"endpoint"`
	Ticket      string `json:"ticket"`
	ExpiresInS  int64  `json:"expiresInSeconds"`
	PlayerName  string `json:"playerName"`
}

type handoffTransfer struct {
	Character    storage.Character `json:"character"`
	Velocity     vec3              `json:"velocity"`
	Yaw          float64           `json:"yaw"`
	FromRegionID string            `json:"fromRegionId"`
	ToRegionID   string            `json:"toRegionId"`
	SentAt       time.Time         `json:"sentAt"`
}

func main() {
	cfg := config{
		addr:              env("WORLDD_ADDR", ":7355"),
		dbDSN:             env("WORLD_DB_DSN", "postgres://postgres:postgres@localhost:5432/jrland?sslmode=disable"),
		redisAddr:         env("REDIS_ADDR", "localhost:6379"),
		redisPassword:     env("REDIS_PASSWORD", ""),
		natsURL:           env("NATS_URL", "nats://localhost:4222"),
		worldID:           env("WORLD_ID", "main"),
		regionID:          env("WORLDD_REGION_ID", "region-0-0"),
		gatewayConsumeURL: env("WORLD_GATEWAY_CONSUME_URL", "http://localhost:8081/internal/world/consume-ticket"),
		gatewayHandoffURL: env("WORLD_GATEWAY_ISSUE_HANDOFF_URL", "http://localhost:8081/internal/world/issue-handoff"),
		streamRadius:      2,
		agonesSDKPort:     env("AGONES_SDK_HTTP_PORT", ""),
		publicWSURL:       env("WORLDD_PUBLIC_WS_URL", ""),
		publicHealthURL:   env("WORLDD_PUBLIC_HEALTH_URL", ""),
		publicWSScheme:    env("WORLDD_PUBLIC_WS_SCHEME", "ws"),
		handoffGrace:      10 * time.Second,
	}

	ctx := context.Background()
	store, err := storage.New(ctx, cfg.dbDSN)
	if err != nil {
		log.Fatalf("connect store: %v", err)
	}
	defer store.Close()

	var registry *regions.Registry
	rdb := redis.NewClient(&redis.Options{
		Addr:     cfg.redisAddr,
		Password: cfg.redisPassword,
	})
	if err := rdb.Ping(ctx).Err(); err == nil {
		registry = regions.NewRegistry(rdb)
	} else {
		log.Printf("redis unavailable, region registry disabled: %v", err)
	}

	var nc *nats.Conn
	if cfg.natsURL != "" {
		conn, err := nats.Connect(cfg.natsURL, nats.Name("jrland-worldd-"+cfg.regionID))
		if err != nil {
			log.Printf("nats unavailable, handoff transfer bus disabled: %v", err)
		} else {
			nc = conn
		}
	}

	server := &worldServer{
		cfg:      cfg,
		store:    store,
		client:   &http.Client{Timeout: 5 * time.Second},
		agones:   agones.NewSDKClient(cfg.agonesSDKPort),
		registry: registry,
		nats:     nc,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(*http.Request) bool { return true },
		},
		players:          map[string]*playerSession{},
		chunks:           map[string]*chunk{},
		pendingTransfers: map[string]*handoffTransfer{},
	}

	go server.run(ctx)
	go server.runAgones(ctx)
	go server.runRegionRegistration(ctx)
	go server.runHandoffSubscriber(ctx)

	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", server.handleHealth)
	mux.HandleFunc("/world", server.handleWorld)

	log.Printf("worldd listening on %s", cfg.addr)
	if err := http.ListenAndServe(cfg.addr, cors(mux)); err != nil {
		log.Fatal(err)
	}
}

func (s *worldServer) handleHealth(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":      true,
		"service": "worldd",
		"region":  s.cfg.regionID,
		"tick":    s.tick,
	})
}

func (s *worldServer) handleWorld(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	envelope, err := readClientEnvelope(conn)
	if err != nil {
		_ = conn.Close()
		return
	}
	hello, ok := envelope.Payload.(*worldpb.ClientEnvelope_Hello)
	if !ok || hello.Hello == nil || hello.Hello.Ticket == "" {
		sendStaticError(conn, "BAD_HELLO", "expected hello with ticket")
		_ = conn.Close()
		return
	}

	claims, err := s.consumeTicket(r.Context(), hello.Hello.Ticket)
	if err != nil {
		sendStaticError(conn, "INVALID_TICKET", err.Error())
		_ = conn.Close()
		return
	}
	if claims.WorldID != s.cfg.worldID || claims.RegionID != s.cfg.regionID {
		sendStaticError(conn, "WRONG_REGION", "ticket is not valid for this world server")
		_ = conn.Close()
		return
	}
	transfer := s.takePendingTransfer(claims.CharacterID)
	usedTransfer := transfer != nil

	var character *storage.Character
	if transfer != nil {
		snapshot := transfer.Character
		snapshot.RegionID = s.cfg.regionID
		character = &snapshot
	} else {
		character, err = s.store.LoadCharacterByID(r.Context(), claims.CharacterID)
		if err != nil {
			sendStaticError(conn, "UNKNOWN_CHARACTER", err.Error())
			_ = conn.Close()
			return
		}
	}
	if character.Name == "" {
		character.Name = claims.PlayerName
	}

	sessionID := fmt.Sprintf("%s:%d", character.ID, time.Now().UnixMilli())
	player := &playerSession{
		conn:      conn,
		sessionID: sessionID,
		character: character,
		position: vec3{
			X: character.X,
			Y: character.Y,
			Z: character.Z,
		},
		visibleChunks: map[string]struct{}{},
	}
	if transfer != nil {
		player.velocity = transfer.Velocity
		player.yaw = transfer.Yaw
	}

	s.mu.Lock()
	s.players[player.character.ID] = player
	s.mu.Unlock()

	if err := s.sendWelcome(player); err != nil {
		s.removePlayer(player.character.ID)
		_ = conn.Close()
		return
	}
	if usedTransfer {
		_ = s.sendEnvelope(player, &worldpb.ServerEnvelope{
			Tick:         s.tick,
			ServerTimeMs: uint64(time.Now().UnixMilli()),
			Payload: &worldpb.ServerEnvelope_HandoffCommit{
				HandoffCommit: &worldpb.HandoffCommit{
					NextRegionId: s.cfg.regionID,
				},
			},
		})
	}

	go s.readLoop(player)
}

func (s *worldServer) run(ctx context.Context) {
	simTicker := time.NewTicker(time.Second / 20)
	defer simTicker.Stop()
	saveTicker := time.NewTicker(2 * time.Second)
	defer saveTicker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-simTicker.C:
			s.tick++
			s.stepPlayers(1.0 / 20.0)
			if s.tick%2 == 0 {
				s.broadcastWorldState()
			}
		case <-saveTicker.C:
			s.persistPlayers()
		}
	}
}

func (s *worldServer) runAgones(ctx context.Context) {
	if s.agones == nil || !s.agones.Enabled() {
		return
	}

	readyTicker := time.NewTicker(1 * time.Second)
	defer readyTicker.Stop()
	healthTicker := time.NewTicker(2 * time.Second)
	defer healthTicker.Stop()

	ready := false
	for {
		select {
		case <-ctx.Done():
			return
		case <-readyTicker.C:
			if ready {
				continue
			}
			if err := s.agones.Ready(ctx); err != nil {
				log.Printf("agones ready retry: %v", err)
				continue
			}
			ready = true
			gameServer, err := s.agones.GetGameServer(ctx)
			if err != nil {
				log.Printf("agones ready; gameserver lookup failed: %v", err)
				continue
			}
			log.Printf(
				"agones ready: gameserver=%s namespace=%s address=%s",
				gameServer.ObjectMeta.Name,
				gameServer.ObjectMeta.Namespace,
				gameServer.Status.Address,
			)
		case <-healthTicker.C:
			if !ready {
				continue
			}
			if err := s.agones.Health(ctx); err != nil {
				log.Printf("agones health ping failed: %v", err)
			}
		}
	}
}

func (s *worldServer) runRegionRegistration(ctx context.Context) {
	if s.registry == nil {
		return
	}
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		if err := s.registerRegionOwner(ctx); err != nil {
			log.Printf("register region owner: %v", err)
		}
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
		}
	}
}

func (s *worldServer) registerRegionOwner(ctx context.Context) error {
	endpoint, gameServerName, err := s.resolvePublicWSEndpoint(ctx)
	if err != nil {
		return err
	}
	healthURL := s.cfg.publicHealthURL
	if healthURL == "" {
		healthURL = regions.DeriveHealthURL(endpoint)
	}
	return s.registry.Put(ctx, &regions.Owner{
		WorldID:        s.cfg.worldID,
		RegionID:       s.cfg.regionID,
		Endpoint:       endpoint,
		HealthURL:      healthURL,
		GameServerName: gameServerName,
		Source:         "worldd",
	})
}

func (s *worldServer) runHandoffSubscriber(ctx context.Context) {
	if s.nats == nil {
		return
	}
	subject := handoffSubject(s.cfg.worldID, s.cfg.regionID)
	subscription, err := s.nats.Subscribe(subject, func(message *nats.Msg) {
		var transfer handoffTransfer
		if err := json.Unmarshal(message.Data, &transfer); err != nil {
			log.Printf("decode handoff transfer: %v", err)
			return
		}
		s.mu.Lock()
		s.pendingTransfers[transfer.Character.ID] = &transfer
		s.mu.Unlock()
	})
	if err != nil {
		log.Printf("subscribe handoff subject: %v", err)
		return
	}
	defer func() {
		_ = subscription.Unsubscribe()
	}()
	if err := s.nats.Flush(); err != nil {
		log.Printf("flush handoff subscription: %v", err)
	}
	<-ctx.Done()
}

func (s *worldServer) beginHandoff(player *playerSession, targetRegionID string) {
	if targetRegionID == "" || targetRegionID == s.cfg.regionID {
		return
	}

	player.mu.Lock()
	if player.handoffTo != "" {
		player.mu.Unlock()
		return
	}
	snapshot := *player.character
	snapshot.X = player.position.X
	snapshot.Y = player.position.Y
	snapshot.Z = player.position.Z
	snapshot.RegionID = targetRegionID
	player.character.RegionID = targetRegionID
	player.handoffTo = targetRegionID
	player.handoffAt = time.Now()
	transfer := handoffTransfer{
		Character:    snapshot,
		Velocity:     player.velocity,
		Yaw:          player.yaw,
		FromRegionID: s.cfg.regionID,
		ToRegionID:   targetRegionID,
		SentAt:       time.Now().UTC(),
	}
	player.mu.Unlock()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := s.store.SaveCharacter(ctx, &snapshot); err != nil {
		s.clearHandoff(player)
		s.sendPlayerError(player, "HANDOFF_SAVE_FAILED", "Could not checkpoint character state for region handoff.")
		return
	}

	response, err := s.issueHandoff(ctx, issueHandoffRequest{
		UserID:      snapshot.UserID,
		CharacterID: snapshot.ID,
		PlayerName:  snapshot.Name,
		RegionID:    targetRegionID,
	})
	if err != nil {
		s.clearHandoff(player)
		s.sendPlayerError(player, "HANDOFF_UNAVAILABLE", "Could not resolve the next world region.")
		return
	}

	if err := s.publishTransfer(transfer); err != nil {
		log.Printf("publish handoff transfer: %v", err)
	}

	if err := s.sendEnvelope(player, &worldpb.ServerEnvelope{
		Tick:         s.tick,
		ServerTimeMs: uint64(time.Now().UnixMilli()),
		Payload: &worldpb.ServerEnvelope_HandoffPrepare{
			HandoffPrepare: &worldpb.HandoffPrepare{
				NextRegionId: response.RegionID,
				NextAddress:  response.Endpoint,
				Ticket:       response.Ticket,
			},
		},
	}); err != nil {
		log.Printf("send handoff prepare: %v", err)
	}
}

func (s *worldServer) clearHandoff(player *playerSession) {
	player.mu.Lock()
	player.handoffTo = ""
	player.handoffAt = time.Time{}
	player.character.RegionID = s.cfg.regionID
	player.mu.Unlock()
}

func (s *worldServer) takePendingTransfer(characterID string) *handoffTransfer {
	s.mu.Lock()
	defer s.mu.Unlock()
	transfer := s.pendingTransfers[characterID]
	delete(s.pendingTransfers, characterID)
	return transfer
}

func (s *worldServer) publishTransfer(transfer handoffTransfer) error {
	if s.nats == nil {
		return nil
	}
	payload, err := json.Marshal(transfer)
	if err != nil {
		return err
	}
	return s.nats.Publish(handoffSubject(s.cfg.worldID, transfer.ToRegionID), payload)
}

func (s *worldServer) issueHandoff(ctx context.Context, request issueHandoffRequest) (*issueHandoffResponse, error) {
	body, err := json.Marshal(request)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.cfg.gatewayHandoffURL, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	res, err := s.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("gateway returned %d during handoff issue", res.StatusCode)
	}
	var response issueHandoffResponse
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return nil, err
	}
	return &response, nil
}

func (s *worldServer) resolvePublicWSEndpoint(ctx context.Context) (endpoint string, gameServerName string, err error) {
	if s.cfg.publicWSURL != "" {
		return s.cfg.publicWSURL, "", nil
	}
	if s.agones == nil || !s.agones.Enabled() {
		return "", "", fmt.Errorf("no public world endpoint configured")
	}
	gameServer, err := s.agones.GetGameServer(ctx)
	if err != nil {
		return "", "", err
	}
	port := int32(0)
	for _, candidate := range gameServer.Status.Ports {
		if candidate.Name == "world" || port == 0 {
			port = candidate.Port
		}
	}
	if gameServer.Status.Address == "" || port <= 0 {
		return "", "", fmt.Errorf("agones gameserver is missing a routable address")
	}
	return fmt.Sprintf("%s://%s:%d/world", s.cfg.publicWSScheme, gameServer.Status.Address, port), gameServer.ObjectMeta.Name, nil
}

func handoffSubject(worldID, regionID string) string {
	return "jrland.handoff." + worldID + "." + regionID
}

func (s *worldServer) readLoop(player *playerSession) {
	defer func() {
		s.persistPlayer(player)
		s.removePlayer(player.character.ID)
		_ = player.conn.Close()
	}()

	for {
		envelope, err := readClientEnvelope(player.conn)
		if err != nil {
			return
		}
		switch payload := envelope.Payload.(type) {
		case *worldpb.ClientEnvelope_InputFrame:
			if payload.InputFrame == nil || payload.InputFrame.Move == nil {
				continue
			}
			player.mu.Lock()
			if player.handoffTo != "" {
				player.mu.Unlock()
				continue
			}
			player.moveX = float64(payload.InputFrame.Move.MoveX)
			player.moveZ = float64(payload.InputFrame.Move.MoveZ)
			player.sprint = payload.InputFrame.Move.Sprint
			player.yaw = float64(payload.InputFrame.Move.Yaw)
			player.mu.Unlock()
		case *worldpb.ClientEnvelope_MineCommand:
			if payload.MineCommand != nil {
				player.mu.Lock()
				handoffPending := player.handoffTo != ""
				player.mu.Unlock()
				if handoffPending {
					continue
				}
				s.handleMine(player, payload.MineCommand)
			}
		case *worldpb.ClientEnvelope_BuildCommand:
			if payload.BuildCommand != nil {
				player.mu.Lock()
				handoffPending := player.handoffTo != ""
				player.mu.Unlock()
				if handoffPending {
					continue
				}
				s.handleBuild(player, payload.BuildCommand)
			}
		case *worldpb.ClientEnvelope_ChatLocal:
			if payload.ChatLocal != nil {
				player.mu.Lock()
				handoffPending := player.handoffTo != ""
				player.mu.Unlock()
				if handoffPending {
					continue
				}
				text := strings.TrimSpace(payload.ChatLocal.Text)
				if s.handleChatCommand(player, text) {
					continue
				}
				s.broadcastChat(player, text)
			}
		}
	}
}

func (s *worldServer) stepPlayers(dt float64) {
	for _, player := range s.playerList() {
		player.mu.Lock()
		if player.handoffTo != "" {
			shouldClose := s.cfg.handoffGrace > 0 && time.Since(player.handoffAt) > s.cfg.handoffGrace
			conn := player.conn
			player.mu.Unlock()
			if shouldClose {
				_ = conn.Close()
			}
			continue
		}
		moveX := player.moveX
		moveZ := player.moveZ
		sprint := player.sprint
		player.mu.Unlock()

		length := math.Hypot(moveX, moveZ)
		if length > 1 {
			moveX /= length
			moveZ /= length
		}

		speed := 4.2
		if sprint {
			speed = 6.2
		}

		player.mu.Lock()
		player.position.X += moveX * speed * dt
		player.position.Z += moveZ * speed * dt
		player.velocity.X = moveX * speed
		player.velocity.Z = moveZ * speed
		player.position.Y = float64(s.surfaceHeightAt(player.position.X, player.position.Z) + 1)
		player.velocity.Y = 0
		player.character.X = player.position.X
		player.character.Y = player.position.Y
		player.character.Z = player.position.Z
		player.character.RegionID = s.cfg.regionID
		targetRegionID := regions.RegionIDForPosition(player.position.X, player.position.Z)
		player.mu.Unlock()

		if targetRegionID != s.cfg.regionID {
			go s.beginHandoff(player, targetRegionID)
		}
	}
}

func (s *worldServer) broadcastWorldState() {
	entities := s.entitySnapshots()
	for _, player := range s.playerList() {
		s.syncVisibleChunks(player)
		_ = s.sendEnvelope(player, &worldpb.ServerEnvelope{
			Tick:         s.tick,
			ServerTimeMs: uint64(time.Now().UnixMilli()),
			Payload: &worldpb.ServerEnvelope_WorldState{
				WorldState: &worldpb.WorldState{
					Entities: entities,
				},
			},
		})
	}
}

func (s *worldServer) sendWelcome(player *playerSession) error {
	entities := s.entitySnapshots()
	chunks := s.visibleChunkSnapshots(player.position.X, player.position.Z, s.cfg.streamRadius)
	for _, snapshot := range chunks {
		player.visibleChunks[chunkKey(snapshot.ChunkX, snapshot.ChunkZ)] = struct{}{}
	}
	return s.sendEnvelope(player, &worldpb.ServerEnvelope{
		Tick:         s.tick,
		ServerTimeMs: uint64(time.Now().UnixMilli()),
		Payload: &worldpb.ServerEnvelope_Welcome{
			Welcome: &worldpb.WelcomeSnapshot{
				SessionId:    player.sessionID,
				WorldId:      s.cfg.worldID,
				RegionId:     s.cfg.regionID,
				SelfPlayerId: player.character.ID,
				Entities:     entities,
				Chunks:       chunks,
				Inventory:    inventoryToProto(player.character.Inventory),
			},
		},
	})
}

func (s *worldServer) syncVisibleChunks(player *playerSession) {
	player.mu.Lock()
	position := player.position
	if player.visibleChunks == nil {
		player.visibleChunks = map[string]struct{}{}
	}
	player.mu.Unlock()

	snapshots := s.visibleChunkSnapshots(position.X, position.Z, s.cfg.streamRadius)
	for _, snapshot := range snapshots {
		key := chunkKey(snapshot.ChunkX, snapshot.ChunkZ)
		player.mu.Lock()
		_, seen := player.visibleChunks[key]
		if !seen {
			player.visibleChunks[key] = struct{}{}
		}
		player.mu.Unlock()
		if seen {
			continue
		}
		_ = s.sendEnvelope(player, &worldpb.ServerEnvelope{
			Tick:         s.tick,
			ServerTimeMs: uint64(time.Now().UnixMilli()),
			Payload: &worldpb.ServerEnvelope_ChunkSnapshot{
				ChunkSnapshot: snapshot,
			},
		})
	}
}

func (s *worldServer) handleMine(player *playerSession, cmd *worldpb.MineCommand) {
	player.mu.Lock()
	position := player.position
	player.mu.Unlock()

	if !withinRange(position, cmd.X, cmd.Y, cmd.Z, 7.5) {
		s.sendPlayerError(player, "OUT_OF_RANGE", "Mine target is too far away.")
		return
	}

	blockType := s.getBlockAtWorldLocked(cmd.X, cmd.Y, cmd.Z)
	if blockType == 0 || cmd.Y <= 1 {
		s.sendPlayerError(player, "INVALID_MINE", "Nothing to mine there.")
		return
	}
	delta, _ := s.setBlockAtWorldLocked(cmd.X, cmd.Y, cmd.Z, 0)
	player.mu.Lock()
	addInventory(player.character, blockType)
	player.mu.Unlock()
	s.persistChunkDelta(delta)
	s.broadcastChunkDelta(delta)
	s.sendInventory(player)
}

func (s *worldServer) handleBuild(player *playerSession, cmd *worldpb.BuildCommand) {
	player.mu.Lock()
	position := player.position
	player.mu.Unlock()

	if !withinRange(position, cmd.X, cmd.Y, cmd.Z, 7.5) {
		s.sendPlayerError(player, "OUT_OF_RANGE", "Build target is too far away.")
		return
	}
	if cmd.BlockType == 0 {
		s.sendPlayerError(player, "INVALID_BLOCK", "Choose a block before building.")
		return
	}

	player.mu.Lock()
	if !consumeInventory(player.character, cmd.BlockType) {
		player.mu.Unlock()
		s.sendPlayerError(player, "NO_STOCK", "You are out of that block.")
		return
	}
	player.mu.Unlock()

	current := s.getBlockAtWorldLocked(cmd.X, cmd.Y, cmd.Z)
	below := s.getBlockAtWorldLocked(cmd.X, cmd.Y-1, cmd.Z)
	if current != 0 || (cmd.Y > 1 && below == 0) {
		player.mu.Lock()
		addInventory(player.character, cmd.BlockType)
		player.mu.Unlock()
		s.sendPlayerError(player, "INVALID_BUILD", "That block placement is not supported.")
		return
	}
	delta, _ := s.setBlockAtWorldLocked(cmd.X, cmd.Y, cmd.Z, cmd.BlockType)

	s.persistChunkDelta(delta)
	s.broadcastChunkDelta(delta)
	s.sendInventory(player)
}

func (s *worldServer) broadcastChat(player *playerSession, text string) {
	if text == "" {
		return
	}
	message := &worldpb.ChatMessage{
		Scope:      worldpb.ChatScope_CHAT_SCOPE_LOCAL,
		AuthorId:   player.character.ID,
		AuthorName: player.character.Name,
		Text:       text,
		TimeMs:     uint64(time.Now().UnixMilli()),
	}
	for _, target := range s.playerList() {
		_ = s.sendEnvelope(target, &worldpb.ServerEnvelope{
			Tick:         s.tick,
			ServerTimeMs: uint64(time.Now().UnixMilli()),
			Payload: &worldpb.ServerEnvelope_Chat{
				Chat: message,
			},
		})
	}
}

func (s *worldServer) handleChatCommand(player *playerSession, text string) bool {
	if !strings.HasPrefix(text, "/") {
		return false
	}

	parts := strings.Fields(text)
	if len(parts) == 0 {
		return true
	}

	switch parts[0] {
	case "/tp":
		if len(parts) < 3 {
			s.sendPlayerError(player, "BAD_COMMAND", "Usage: /tp <x> <z>")
			return true
		}
		var x, z float64
		if _, err := fmt.Sscanf(parts[1], "%f", &x); err != nil {
			s.sendPlayerError(player, "BAD_COMMAND", "Teleport X coordinate is invalid.")
			return true
		}
		if _, err := fmt.Sscanf(parts[2], "%f", &z); err != nil {
			s.sendPlayerError(player, "BAD_COMMAND", "Teleport Z coordinate is invalid.")
			return true
		}
		s.teleportPlayer(player, x, z)
		return true
	case "/region":
		if len(parts) < 3 {
			s.sendPlayerError(player, "BAD_COMMAND", "Usage: /region <x> <z>")
			return true
		}
		var regionX, regionZ int32
		if _, err := fmt.Sscanf(parts[1], "%d", &regionX); err != nil {
			s.sendPlayerError(player, "BAD_COMMAND", "Region X is invalid.")
			return true
		}
		if _, err := fmt.Sscanf(parts[2], "%d", &regionZ); err != nil {
			s.sendPlayerError(player, "BAD_COMMAND", "Region Z is invalid.")
			return true
		}
		x := float64(int(regionX)*regions.RegionSizeX + regions.RegionSizeX/2)
		z := float64(int(regionZ)*regions.RegionSizeZ + regions.RegionSizeZ/2)
		s.teleportPlayer(player, x, z)
		return true
	default:
		s.sendPlayerError(player, "BAD_COMMAND", "Unknown command.")
		return true
	}
}

func (s *worldServer) teleportPlayer(player *playerSession, x, z float64) {
	player.mu.Lock()
	player.position.X = x
	player.position.Z = z
	player.position.Y = float64(s.surfaceHeightAt(x, z) + 1)
	player.velocity = vec3{}
	player.character.X = player.position.X
	player.character.Y = player.position.Y
	player.character.Z = player.position.Z
	player.mu.Unlock()
}

func (s *worldServer) sendInventory(player *playerSession) {
	player.mu.Lock()
	slots := inventoryToProto(player.character.Inventory)
	player.mu.Unlock()
	_ = s.sendEnvelope(player, &worldpb.ServerEnvelope{
		Tick:         s.tick,
		ServerTimeMs: uint64(time.Now().UnixMilli()),
		Payload: &worldpb.ServerEnvelope_InventoryDelta{
			InventoryDelta: &worldpb.InventoryDelta{
				Slots: slots,
			},
		},
	})
}

func (s *worldServer) sendPlayerError(player *playerSession, code, message string) {
	_ = s.sendEnvelope(player, &worldpb.ServerEnvelope{
		Tick:         s.tick,
		ServerTimeMs: uint64(time.Now().UnixMilli()),
		Payload: &worldpb.ServerEnvelope_Error{
			Error: &worldpb.ServerError{
				Code:    code,
				Message: message,
			},
		},
	})
}

func (s *worldServer) broadcastChunkDelta(delta *worldpb.ChunkDelta) {
	for _, player := range s.playerList() {
		player.mu.Lock()
		_, visible := player.visibleChunks[chunkKey(delta.ChunkX, delta.ChunkZ)]
		player.mu.Unlock()
		if !visible {
			continue
		}
		_ = s.sendEnvelope(player, &worldpb.ServerEnvelope{
			Tick:         s.tick,
			ServerTimeMs: uint64(time.Now().UnixMilli()),
			Payload: &worldpb.ServerEnvelope_ChunkDelta{
				ChunkDelta: delta,
			},
		})
	}
}

func (s *worldServer) persistChunkDelta(delta *worldpb.ChunkDelta) {
	if delta == nil {
		return
	}
	chunkRef := s.getChunk(delta.ChunkX, delta.ChunkZ)
	overridesCopy := make(map[int]uint32, len(chunkRef.Overrides))
	for key, value := range chunkRef.Overrides {
		overridesCopy[key] = value
	}
	go func(version uint32, overrides map[int]uint32, chunkX, chunkZ int32) {
		if err := s.store.SaveChunkOverrides(context.Background(), s.cfg.worldID, chunkX, chunkZ, version, overrides); err != nil {
			log.Printf("save chunk override: %v", err)
		}
	}(chunkRef.Version, overridesCopy, chunkRef.X, chunkRef.Z)
}

func (s *worldServer) persistPlayers() {
	for _, player := range s.playerList() {
		s.persistPlayer(player)
	}
}

func (s *worldServer) persistPlayer(player *playerSession) {
	player.mu.Lock()
	character := *player.character
	character.X = player.position.X
	character.Y = player.position.Y
	character.Z = player.position.Z
	player.mu.Unlock()
	if err := s.store.SaveCharacter(context.Background(), &character); err != nil {
		log.Printf("save character: %v", err)
	}
}

func (s *worldServer) consumeTicket(ctx context.Context, ticket string) (*consumeTicketResponse, error) {
	body, _ := json.Marshal(consumeTicketRequest{Ticket: ticket})
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, s.cfg.gatewayConsumeURL, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	res, err := s.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("gateway rejected ticket")
	}
	var payload consumeTicketResponse
	if err := json.NewDecoder(res.Body).Decode(&payload); err != nil {
		return nil, err
	}
	return &payload, nil
}

func (s *worldServer) sendEnvelope(player *playerSession, envelope *worldpb.ServerEnvelope) error {
	payload, err := proto.Marshal(envelope)
	if err != nil {
		return err
	}
	player.mu.Lock()
	defer player.mu.Unlock()
	return player.conn.WriteMessage(websocket.BinaryMessage, payload)
}

func readClientEnvelope(conn *websocket.Conn) (*worldpb.ClientEnvelope, error) {
	_, payload, err := conn.ReadMessage()
	if err != nil {
		return nil, err
	}
	var envelope worldpb.ClientEnvelope
	if err := proto.Unmarshal(payload, &envelope); err != nil {
		return nil, err
	}
	return &envelope, nil
}

func sendStaticError(conn *websocket.Conn, code, message string) {
	envelope := &worldpb.ServerEnvelope{
		ServerTimeMs: uint64(time.Now().UnixMilli()),
		Payload: &worldpb.ServerEnvelope_Error{
			Error: &worldpb.ServerError{
				Code:    code,
				Message: message,
			},
		},
	}
	payload, err := proto.Marshal(envelope)
	if err == nil {
		_ = conn.WriteMessage(websocket.BinaryMessage, payload)
	}
}

func (s *worldServer) entitySnapshots() []*worldpb.EntitySnapshot {
	players := s.playerList()
	entities := make([]*worldpb.EntitySnapshot, 0, len(players))
	for _, player := range players {
		player.mu.Lock()
		entities = append(entities, &worldpb.EntitySnapshot{
			EntityId: player.character.ID,
			Kind:     worldpb.EntityKind_ENTITY_KIND_PLAYER,
			Name:     player.character.Name,
			Position: &worldpb.Vector3{
				X: float32(player.position.X),
				Y: float32(player.position.Y),
				Z: float32(player.position.Z),
			},
			Velocity: &worldpb.Vector3{
				X: float32(player.velocity.X),
				Y: float32(player.velocity.Y),
				Z: float32(player.velocity.Z),
			},
			Yaw: float32(player.yaw),
		})
		player.mu.Unlock()
	}
	return entities
}

func (s *worldServer) visibleChunkSnapshots(x, z float64, radius int32) []*worldpb.ChunkSnapshot {
	cx := int32(math.Floor(x / chunkSizeX))
	cz := int32(math.Floor(z / chunkSizeZ))
	chunks := make([]*worldpb.ChunkSnapshot, 0, int((radius*2+1)*(radius*2+1)))
	for dz := -radius; dz <= radius; dz++ {
		for dx := -radius; dx <= radius; dx++ {
			chunk := s.getChunk(cx+dx, cz+dz)
			chunks = append(chunks, chunk.toProto())
		}
	}
	return chunks
}

func (s *worldServer) getChunk(chunkX, chunkZ int32) *chunk {
	key := chunkKey(chunkX, chunkZ)

	s.mu.RLock()
	existing := s.chunks[key]
	s.mu.RUnlock()
	if existing != nil {
		return existing
	}

	base := generateChunk(chunkX, chunkZ)
	overrides, version, err := s.store.LoadChunkOverrides(context.Background(), s.cfg.worldID, chunkX, chunkZ)
	if err != nil {
		log.Printf("load chunk overrides: %v", err)
	}
	base.Version = version
	base.Overrides = overrides
	for index, blockType := range overrides {
		if index >= 0 && index < len(base.Blocks) {
			base.Blocks[index] = blockType
		}
	}

	s.mu.Lock()
	if current := s.chunks[key]; current != nil {
		s.mu.Unlock()
		return current
	}
	s.chunks[key] = base
	s.mu.Unlock()
	return base
}

func generateChunk(chunkX, chunkZ int32) *chunk {
	blocks := make([]uint32, chunkSizeX*chunkSizeY*chunkSizeZ)
	for localZ := 0; localZ < chunkSizeZ; localZ++ {
		for localX := 0; localX < chunkSizeX; localX++ {
			worldX := int(chunkX)*chunkSizeX + localX
			worldZ := int(chunkZ)*chunkSizeZ + localZ
			height := terrainHeight(worldX, worldZ)
			for y := 0; y <= height && y < chunkSizeY; y++ {
				blockType := uint32(3)
				if y == height {
					blockType = 1
				} else if y >= height-3 {
					blockType = 2
				}
				blocks[chunkIndex(localX, y, localZ)] = blockType
			}

			if shouldPlaceTree(worldX, worldZ) && localX > 2 && localX < chunkSizeX-3 && localZ > 2 && localZ < chunkSizeZ-3 {
				trunkBase := height + 1
				for y := trunkBase; y < trunkBase+4 && y < chunkSizeY; y++ {
					blocks[chunkIndex(localX, y, localZ)] = 4
				}
				for leafZ := -2; leafZ <= 2; leafZ++ {
					for leafX := -2; leafX <= 2; leafX++ {
						for leafY := trunkBase + 2; leafY <= trunkBase+4 && leafY < chunkSizeY; leafY++ {
							if abs(leafX)+abs(leafZ) > 3 {
								continue
							}
							blocks[chunkIndex(localX+leafX, leafY, localZ+leafZ)] = 5
						}
					}
				}
			}
		}
	}
	return &chunk{
		X:         chunkX,
		Z:         chunkZ,
		Blocks:    blocks,
		Overrides: map[int]uint32{},
	}
}

func terrainHeight(worldX, worldZ int) int {
	a := math.Sin(float64(worldX)*0.075) * 5
	b := math.Cos(float64(worldZ)*0.055) * 4
	c := math.Sin(float64(worldX+worldZ)*0.025) * 6
	height := 28 + int(math.Round(a+b+c))
	if height < 8 {
		return 8
	}
	if height > 72 {
		return 72
	}
	return height
}

func shouldPlaceTree(worldX, worldZ int) bool {
	hash := uint32((worldX * 73856093) ^ (worldZ * 19349663))
	return hash%37 == 0
}

func (s *worldServer) surfaceHeightAt(worldX, worldZ float64) int {
	x := int(math.Floor(worldX))
	z := int(math.Floor(worldZ))
	chunkX := int32(floorDiv(x, chunkSizeX))
	chunkZ := int32(floorDiv(z, chunkSizeZ))
	chunk := s.getChunk(chunkX, chunkZ)
	localX := positiveMod(x, chunkSizeX)
	localZ := positiveMod(z, chunkSizeZ)
	for y := chunkSizeY - 1; y >= 0; y-- {
		if chunk.Blocks[chunkIndex(localX, y, localZ)] != 0 {
			return y
		}
	}
	return 1
}

func (s *worldServer) getBlockAtWorldLocked(worldX, worldY, worldZ int32) uint32 {
	chunkX := int32(floorDiv(int(worldX), chunkSizeX))
	chunkZ := int32(floorDiv(int(worldZ), chunkSizeZ))
	chunk := s.getChunk(chunkX, chunkZ)
	if worldY < 0 || worldY >= chunkSizeY {
		return 0
	}
	localX := positiveMod(int(worldX), chunkSizeX)
	localZ := positiveMod(int(worldZ), chunkSizeZ)
	return chunk.Blocks[chunkIndex(localX, int(worldY), localZ)]
}

func (s *worldServer) setBlockAtWorldLocked(worldX, worldY, worldZ int32, blockType uint32) (*worldpb.ChunkDelta, bool) {
	chunkX := int32(floorDiv(int(worldX), chunkSizeX))
	chunkZ := int32(floorDiv(int(worldZ), chunkSizeZ))
	chunk := s.getChunk(chunkX, chunkZ)
	localX := positiveMod(int(worldX), chunkSizeX)
	localZ := positiveMod(int(worldZ), chunkSizeZ)
	index := chunkIndex(localX, int(worldY), localZ)
	chunk.Blocks[index] = blockType
	chunk.Overrides[index] = blockType
	chunk.Version++
	return &worldpb.ChunkDelta{
		ChunkX:  chunkX,
		ChunkZ:  chunkZ,
		Version: chunk.Version,
		Changes: []*worldpb.ChunkChange{
			{
				Index:     uint32(index),
				BlockType: blockType,
			},
		},
	}, true
}

func (c *chunk) toProto() *worldpb.ChunkSnapshot {
	blocks := make([]uint32, len(c.Blocks))
	copy(blocks, c.Blocks)
	return &worldpb.ChunkSnapshot{
		ChunkX:  c.X,
		ChunkZ:  c.Z,
		Version: c.Version,
		SizeX:   chunkSizeX,
		SizeY:   chunkSizeY,
		SizeZ:   chunkSizeZ,
		Blocks:  blocks,
	}
}

func inventoryToProto(slots []storage.InventorySlot) []*worldpb.InventorySlot {
	out := make([]*worldpb.InventorySlot, 0, len(slots))
	for _, slot := range slots {
		out = append(out, &worldpb.InventorySlot{
			ItemId:      slot.ItemID,
			Count:       slot.Count,
			HotbarIndex: slot.HotbarSlot,
			BlockType:   slot.BlockType,
		})
	}
	return out
}

func addInventory(character *storage.Character, blockType uint32) {
	itemID := itemIDForBlock(blockType)
	for i := range character.Inventory {
		if character.Inventory[i].BlockType == blockType {
			character.Inventory[i].Count++
			return
		}
	}
	character.Inventory = append(character.Inventory, storage.InventorySlot{
		ItemID:     itemID,
		Count:      1,
		HotbarSlot: uint32(len(character.Inventory)),
		BlockType:  blockType,
	})
}

func consumeInventory(character *storage.Character, blockType uint32) bool {
	for i := range character.Inventory {
		if character.Inventory[i].BlockType != blockType || character.Inventory[i].Count == 0 {
			continue
		}
		character.Inventory[i].Count--
		return true
	}
	return false
}

func itemIDForBlock(blockType uint32) string {
	switch blockType {
	case 1:
		return "grass_block"
	case 2:
		return "dirt_block"
	case 3:
		return "stone_block"
	case 4:
		return "wood_block"
	case 6:
		return "glass_block"
	default:
		return "block"
	}
}

func withinRange(position vec3, x, y, z int32, max float64) bool {
	dx := position.X - (float64(x) + 0.5)
	dy := position.Y - (float64(y) + 0.5)
	dz := position.Z - (float64(z) + 0.5)
	return math.Sqrt(dx*dx+dy*dy+dz*dz) <= max
}

func chunkKey(chunkX, chunkZ int32) string {
	return fmt.Sprintf("%d:%d", chunkX, chunkZ)
}

func chunkIndex(x, y, z int) int {
	return y*chunkSizeX*chunkSizeZ + z*chunkSizeX + x
}

func positiveMod(value, base int) int {
	mod := value % base
	if mod < 0 {
		mod += base
	}
	return mod
}

func floorDiv(value, base int) int {
	if value >= 0 {
		return value / base
	}
	return -int(math.Ceil(float64(-value) / float64(base)))
}

func abs(v int) int {
	if v < 0 {
		return -v
	}
	return v
}

func (s *worldServer) playerList() []*playerSession {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]*playerSession, 0, len(s.players))
	for _, player := range s.players {
		out = append(out, player)
	}
	return out
}

func (s *worldServer) removePlayer(characterID string) {
	s.mu.Lock()
	delete(s.players, characterID)
	s.mu.Unlock()
}

func env(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
