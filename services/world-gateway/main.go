package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jrbussard/jrland/internal/agones"
	"github.com/jrbussard/jrland/internal/regions"
	"github.com/jrbussard/jrland/internal/storage"
	"github.com/jrbussard/jrland/internal/tickets"
	"github.com/redis/go-redis/v9"
)

type config struct {
	addr             string
	dbDSN            string
	redisAddr        string
	redisPassword    string
	jwtSecret        string
	worldID          string
	defaultRegionID  string
	staticWorldWSURL string
	staticHealthURL  string
	ticketTTL        time.Duration
	agonesAllocator  agones.AllocatorConfig
	healthcheckTTL   time.Duration
}

type server struct {
	cfg       config
	store     *storage.Store
	redis     *redis.Client
	client    *http.Client
	registry  *regions.Registry
	allocator regionAllocator
}

type regionAllocator interface {
	Allocate(ctx context.Context, worldID, regionID string) (*regions.Owner, error)
}

type resolveRequest struct {
	UserID      string `json:"userId"`
	Username    string `json:"username"`
	CharacterID string `json:"characterId"`
}

type resolveResponse struct {
	WorldID     string `json:"worldId"`
	RegionID    string `json:"regionId"`
	CharacterID string `json:"characterId"`
	Endpoint    string `json:"endpoint"`
	Ticket      string `json:"ticket"`
	ExpiresInS  int64  `json:"expiresInSeconds"`
	PlayerName  string `json:"playerName"`
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

func main() {
	cfg := config{
		addr:            env("WORLD_GATEWAY_ADDR", ":8081"),
		dbDSN:           env("WORLD_DB_DSN", "postgres://postgres:postgres@localhost:5432/jrland?sslmode=disable"),
		redisAddr:       env("REDIS_ADDR", "localhost:6379"),
		redisPassword:   env("REDIS_PASSWORD", ""),
		jwtSecret:       env("WORLD_JWT_SECRET", "jrland-dev-secret"),
		worldID:         env("WORLD_ID", "main"),
		defaultRegionID: envAny([]string{"WORLD_DEFAULT_REGION_ID", "WORLDD_REGION_ID"}, "region-0-0"),
		staticWorldWSURL: envAny([]string{
			"WORLD_STATIC_WS_URL",
			"WORLDD_PUBLIC_WS_URL",
		}, "ws://localhost:7355/world"),
		staticHealthURL: envAny([]string{
			"WORLD_STATIC_HEALTH_URL",
			"WORLDD_PUBLIC_HEALTH_URL",
		}, "http://localhost:7355/healthz"),
		ticketTTL:      30 * time.Second,
		healthcheckTTL: 2 * time.Second,
		agonesAllocator: agones.AllocatorConfig{
			Endpoint:           env("AGONES_ALLOCATOR_ENDPOINT", ""),
			Namespace:          env("AGONES_NAMESPACE", "default"),
			FleetName:          env("AGONES_FLEET_NAME", "worldd-main"),
			PortName:           env("AGONES_PORT_NAME", "world"),
			WorldScheme:        env("AGONES_WORLD_SCHEME", "ws"),
			ClientCertFile:     env("AGONES_ALLOCATOR_CERT_FILE", ""),
			ClientKeyFile:      env("AGONES_ALLOCATOR_KEY_FILE", ""),
			CACertFile:         env("AGONES_ALLOCATOR_CA_FILE", ""),
			InsecureSkipVerify: envBool("AGONES_ALLOCATOR_INSECURE_SKIP_VERIFY", false),
			Timeout:            5 * time.Second,
		},
	}

	ctx := context.Background()
	store, err := storage.New(ctx, cfg.dbDSN)
	if err != nil {
		log.Fatalf("connect store: %v", err)
	}
	defer store.Close()

	rdb := redis.NewClient(&redis.Options{
		Addr:     cfg.redisAddr,
		Password: cfg.redisPassword,
	})
	if err := rdb.Ping(ctx).Err(); err != nil {
		log.Fatalf("connect redis: %v", err)
	}

	allocator, err := buildAllocator(cfg)
	if err != nil {
		log.Fatalf("configure allocator: %v", err)
	}

	srv := &server{
		cfg:       cfg,
		store:     store,
		redis:     rdb,
		client:    &http.Client{Timeout: cfg.healthcheckTTL},
		registry:  regions.NewRegistry(rdb),
		allocator: allocator,
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", srv.handleHealth)
	mux.HandleFunc("/internal/world/resolve", srv.handleResolve)
	mux.HandleFunc("/internal/world/consume-ticket", srv.handleConsumeTicket)
	mux.HandleFunc("/internal/world/issue-handoff", srv.handleIssueHandoff)

	log.Printf("world-gateway listening on %s", cfg.addr)
	if err := http.ListenAndServe(cfg.addr, cors(mux)); err != nil {
		log.Fatal(err)
	}
}

func (s *server) handleHealth(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":             true,
		"service":        "world-gateway",
		"defaultRegion":  s.cfg.defaultRegionID,
		"staticEndpoint": s.cfg.staticWorldWSURL,
		"staticHealth":   s.cfg.staticHealthURL,
		"allocatorMode":  allocatorMode(s.allocator),
	})
}

func (s *server) handleResolve(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req resolveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if req.UserID == "" {
		http.Error(w, "userId required", http.StatusBadRequest)
		return
	}
	if req.Username == "" {
		req.Username = "Ranger"
	}
	character, err := s.store.LoadOrCreateCharacter(r.Context(), req.UserID, req.Username, s.cfg.worldID, s.cfg.defaultRegionID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	regionID := character.RegionID
	if regionID == "" {
		regionID = s.cfg.defaultRegionID
	}
	response, err := s.issueWorldTicket(r.Context(), req.UserID, character.ID, regionID, character.Name)
	if err != nil {
		if regionID != s.cfg.defaultRegionID {
			log.Printf("repairing stranded character %s from %s to %s after resolve error: %v", character.ID, regionID, s.cfg.defaultRegionID, err)
			character.RegionID = s.cfg.defaultRegionID
			character.X = 8
			character.Y = 38
			character.Z = 8
			if saveErr := s.store.SaveCharacter(r.Context(), character); saveErr == nil {
				response, err = s.issueWorldTicket(r.Context(), req.UserID, character.ID, character.RegionID, character.Name)
				if err == nil {
					writeJSON(w, http.StatusOK, response)
					return
				}
				log.Printf("fallback world resolve failed for %s: %v", character.ID, err)
			} else {
				log.Printf("failed to repair stranded character %s: %v", character.ID, saveErr)
			}
		}
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	writeJSON(w, http.StatusOK, response)
}

func (s *server) handleIssueHandoff(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req issueHandoffRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if req.UserID == "" || req.CharacterID == "" || req.RegionID == "" {
		http.Error(w, "userId, characterId, and regionId are required", http.StatusBadRequest)
		return
	}
	character, err := s.store.LoadCharacterByID(r.Context(), req.CharacterID)
	if err != nil {
		http.Error(w, "unknown character", http.StatusNotFound)
		return
	}
	if character.UserID != req.UserID {
		http.Error(w, "character does not belong to user", http.StatusForbidden)
		return
	}
	playerName := req.PlayerName
	if playerName == "" {
		playerName = character.Name
	}
	response, err := s.issueWorldTicket(r.Context(), req.UserID, req.CharacterID, req.RegionID, playerName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	writeJSON(w, http.StatusOK, response)
}

func (s *server) handleConsumeTicket(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req consumeTicketRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	claims, err := tickets.Parse(s.cfg.jwtSecret, req.Ticket)
	if err != nil {
		http.Error(w, "invalid ticket", http.StatusUnauthorized)
		return
	}
	nonceValue, err := s.redis.GetDel(r.Context(), nonceKey(claims.Nonce)).Result()
	if err != nil || nonceValue != claims.CharacterID {
		http.Error(w, "ticket already used", http.StatusUnauthorized)
		return
	}
	writeJSON(w, http.StatusOK, consumeTicketResponse{
		UserID:      claims.UserID,
		CharacterID: claims.CharacterID,
		WorldID:     claims.WorldID,
		RegionID:    claims.RegionID,
		PlayerName:  claims.PlayerName,
	})
}

func nonceKey(nonce string) string {
	return "world-ticket:" + nonce
}

func randomNonce() (string, error) {
	var buf [16]byte
	if _, err := rand.Read(buf[:]); err != nil {
		return "", err
	}
	return hex.EncodeToString(buf[:]), nil
}

func env(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func envAny(keys []string, fallback string) string {
	for _, key := range keys {
		if value := os.Getenv(key); value != "" {
			return value
		}
	}
	return fallback
}

func envBool(key string, fallback bool) bool {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	switch value {
	case "1", "true", "TRUE", "yes", "YES":
		return true
	case "0", "false", "FALSE", "no", "NO":
		return false
	default:
		return fallback
	}
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

func buildAllocator(cfg config) (regionAllocator, error) {
	if cfg.agonesAllocator.Endpoint != "" {
		allocator, err := agones.NewAllocator(cfg.agonesAllocator)
		if err != nil {
			return nil, err
		}
		return &agonesRegionAllocator{allocator: allocator}, nil
	}
	return &staticRegionAllocator{
		worldID:   cfg.worldID,
		regionID:  cfg.defaultRegionID,
		endpoint:  cfg.staticWorldWSURL,
		healthURL: cfg.staticHealthURL,
	}, nil
}

func (s *server) resolveRegionOwner(ctx context.Context, regionID string) (*regions.Owner, error) {
	owner, err := s.registry.Get(ctx, s.cfg.worldID, regionID)
	if err != nil {
		return nil, err
	}
	if owner != nil {
		healthy, err := s.ownerHealthy(ctx, owner)
		if err == nil && healthy {
			return owner, nil
		}
		if err != nil {
			log.Printf("region owner healthcheck failed for %s: %v", regionID, err)
		}
		if err := s.registry.Delete(ctx, s.cfg.worldID, regionID); err != nil {
			log.Printf("delete stale region owner: %v", err)
		}
	}

	owner, err = s.allocator.Allocate(ctx, s.cfg.worldID, regionID)
	if err != nil {
		return nil, err
	}
	if owner.WorldID == "" {
		owner.WorldID = s.cfg.worldID
	}
	if owner.RegionID == "" {
		owner.RegionID = regionID
	}
	if owner.HealthURL == "" {
		owner.HealthURL = regions.DeriveHealthURL(owner.Endpoint)
	}
	if err := s.registry.Put(ctx, owner); err != nil {
		return nil, err
	}
	return owner, nil
}

func (s *server) ownerHealthy(ctx context.Context, owner *regions.Owner) (bool, error) {
	if owner == nil || owner.HealthURL == "" {
		return false, nil
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, owner.HealthURL, nil)
	if err != nil {
		return false, err
	}
	res, err := s.client.Do(req)
	if err != nil {
		return false, err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(io.LimitReader(res.Body, 512))
		return false, fmt.Errorf("unexpected status %d: %s", res.StatusCode, string(body))
	}
	return true, nil
}

type staticRegionAllocator struct {
	worldID   string
	regionID  string
	endpoint  string
	healthURL string
}

func (a *staticRegionAllocator) Allocate(_ context.Context, worldID, regionID string) (*regions.Owner, error) {
	targetWorldID := worldID
	if targetWorldID == "" {
		targetWorldID = a.worldID
	}
	targetRegionID := regionID
	if targetRegionID == "" {
		targetRegionID = a.regionID
	}
	if targetRegionID != a.regionID {
		return nil, fmt.Errorf("region %s has no registered owner and Agones allocation is disabled", targetRegionID)
	}
	return &regions.Owner{
		WorldID:   targetWorldID,
		RegionID:  targetRegionID,
		Endpoint:  a.endpoint,
		HealthURL: a.healthURL,
		Source:    "static",
	}, nil
}

type agonesRegionAllocator struct {
	allocator *agones.Allocator
}

func (a *agonesRegionAllocator) Allocate(ctx context.Context, worldID, regionID string) (*regions.Owner, error) {
	allocation, err := a.allocator.Allocate(ctx, worldID, regionID)
	if err != nil {
		return nil, err
	}
	return &regions.Owner{
		WorldID:        worldID,
		RegionID:       regionID,
		Endpoint:       allocation.Endpoint,
		HealthURL:      regions.DeriveHealthURL(allocation.Endpoint),
		GameServerName: allocation.GameServerName,
		NodeName:       allocation.NodeName,
		Source:         "agones",
	}, nil
}

func allocatorMode(allocator regionAllocator) string {
	switch allocator.(type) {
	case *agonesRegionAllocator:
		return "agones"
	case *staticRegionAllocator:
		return "static"
	default:
		return "unknown"
	}
}

func (s *server) issueWorldTicket(ctx context.Context, userID, characterID, regionID, playerName string) (resolveResponse, error) {
	owner, err := s.resolveRegionOwner(ctx, regionID)
	if err != nil {
		return resolveResponse{}, fmt.Errorf("resolve region owner: %w", err)
	}
	nonce, err := randomNonce()
	if err != nil {
		return resolveResponse{}, err
	}
	token, err := tickets.Issue(s.cfg.jwtSecret, s.cfg.ticketTTL, &tickets.Claims{
		UserID:      userID,
		CharacterID: characterID,
		WorldID:     owner.WorldID,
		RegionID:    owner.RegionID,
		PlayerName:  playerName,
		Nonce:       nonce,
	})
	if err != nil {
		return resolveResponse{}, err
	}
	if err := s.redis.Set(ctx, nonceKey(nonce), characterID, s.cfg.ticketTTL).Err(); err != nil {
		return resolveResponse{}, err
	}
	return resolveResponse{
		WorldID:     owner.WorldID,
		RegionID:    owner.RegionID,
		CharacterID: characterID,
		Endpoint:    owner.Endpoint,
		Ticket:      token,
		ExpiresInS:  int64(s.cfg.ticketTTL.Seconds()),
		PlayerName:  playerName,
	}, nil
}
