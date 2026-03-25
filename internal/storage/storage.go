package storage

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type InventorySlot struct {
	ItemID     string `json:"itemId"`
	Count      uint32 `json:"count"`
	HotbarSlot uint32 `json:"hotbarSlot"`
	BlockType  uint32 `json:"blockType"`
}

type Character struct {
	ID        string
	UserID    string
	Name      string
	WorldID   string
	RegionID  string
	X         float64
	Y         float64
	Z         float64
	UpdatedAt time.Time
	Inventory []InventorySlot
}

type Store struct {
	db *sql.DB
}

func New(ctx context.Context, dsn string) (*Store, error) {
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}
	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}
	store := &Store{db: db}
	if err := store.EnsureSchema(ctx); err != nil {
		return nil, err
	}
	return store, nil
}

func (s *Store) Close() error {
	if s == nil || s.db == nil {
		return nil
	}
	return s.db.Close()
}

func (s *Store) EnsureSchema(ctx context.Context) error {
	schema := `
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  world_id TEXT NOT NULL,
  region_id TEXT NOT NULL,
  x DOUBLE PRECISION NOT NULL,
  y DOUBLE PRECISION NOT NULL,
  z DOUBLE PRECISION NOT NULL,
  inventory_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chunk_states (
  world_id TEXT NOT NULL,
  chunk_x INTEGER NOT NULL,
  chunk_z INTEGER NOT NULL,
  version INTEGER NOT NULL DEFAULT 0,
  overrides_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (world_id, chunk_x, chunk_z)
);`
	_, err := s.db.ExecContext(ctx, schema)
	return err
}

func (s *Store) LoadOrCreateCharacter(ctx context.Context, userID, name, worldID, regionID string) (*Character, error) {
	existing, err := s.LoadCharacterByUserID(ctx, userID)
	if err == nil {
		return existing, nil
	}
	if !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}
	character := &Character{
		ID:       fmt.Sprintf("char:%s", userID),
		UserID:   userID,
		Name:     name,
		WorldID:  worldID,
		RegionID: regionID,
		X:        8,
		Y:        38,
		Z:        8,
		Inventory: []InventorySlot{
			{ItemID: "grass_block", Count: 24, HotbarSlot: 0, BlockType: 1},
			{ItemID: "dirt_block", Count: 36, HotbarSlot: 1, BlockType: 2},
			{ItemID: "stone_block", Count: 24, HotbarSlot: 2, BlockType: 3},
			{ItemID: "wood_block", Count: 16, HotbarSlot: 3, BlockType: 4},
			{ItemID: "glass_block", Count: 12, HotbarSlot: 4, BlockType: 6},
		},
	}
	if err := s.SaveCharacter(ctx, character); err != nil {
		return nil, err
	}
	return character, nil
}

func (s *Store) LoadCharacterByUserID(ctx context.Context, userID string) (*Character, error) {
	row := s.db.QueryRowContext(ctx, `
SELECT id, user_id, name, world_id, region_id, x, y, z, updated_at, inventory_json
FROM characters
WHERE user_id = $1
`, userID)
	return scanCharacter(row)
}

func (s *Store) LoadCharacterByID(ctx context.Context, characterID string) (*Character, error) {
	row := s.db.QueryRowContext(ctx, `
SELECT id, user_id, name, world_id, region_id, x, y, z, updated_at, inventory_json
FROM characters
WHERE id = $1
`, characterID)
	return scanCharacter(row)
}

func (s *Store) SaveCharacter(ctx context.Context, character *Character) error {
	payload, err := json.Marshal(character.Inventory)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, `
INSERT INTO characters (id, user_id, name, world_id, region_id, x, y, z, inventory_json, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  region_id = EXCLUDED.region_id,
  x = EXCLUDED.x,
  y = EXCLUDED.y,
  z = EXCLUDED.z,
  inventory_json = EXCLUDED.inventory_json,
  updated_at = NOW()
`, character.ID, character.UserID, character.Name, character.WorldID, character.RegionID, character.X, character.Y, character.Z, payload)
	return err
}

func (s *Store) LoadChunkOverrides(ctx context.Context, worldID string, chunkX, chunkZ int32) (map[int]uint32, uint32, error) {
	row := s.db.QueryRowContext(ctx, `
SELECT version, overrides_json
FROM chunk_states
WHERE world_id = $1 AND chunk_x = $2 AND chunk_z = $3
`, worldID, chunkX, chunkZ)
	var version uint32
	var raw []byte
	if err := row.Scan(&version, &raw); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return map[int]uint32{}, 0, nil
		}
		return nil, 0, err
	}
	decoded := map[string]uint32{}
	if err := json.Unmarshal(raw, &decoded); err != nil {
		return nil, 0, err
	}
	out := make(map[int]uint32, len(decoded))
	for key, value := range decoded {
		var index int
		if _, err := fmt.Sscanf(key, "%d", &index); err != nil {
			continue
		}
		out[index] = value
	}
	return out, version, nil
}

func (s *Store) SaveChunkOverrides(ctx context.Context, worldID string, chunkX, chunkZ int32, version uint32, overrides map[int]uint32) error {
	encoded := make(map[string]uint32, len(overrides))
	for index, value := range overrides {
		encoded[fmt.Sprintf("%d", index)] = value
	}
	payload, err := json.Marshal(encoded)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, `
INSERT INTO chunk_states (world_id, chunk_x, chunk_z, version, overrides_json, updated_at)
VALUES ($1, $2, $3, $4, $5, NOW())
ON CONFLICT (world_id, chunk_x, chunk_z) DO UPDATE SET
  version = EXCLUDED.version,
  overrides_json = EXCLUDED.overrides_json,
  updated_at = NOW()
`, worldID, chunkX, chunkZ, version, payload)
	return err
}

type rowScanner interface {
	Scan(dest ...any) error
}

func scanCharacter(row rowScanner) (*Character, error) {
	var character Character
	var raw []byte
	if err := row.Scan(
		&character.ID,
		&character.UserID,
		&character.Name,
		&character.WorldID,
		&character.RegionID,
		&character.X,
		&character.Y,
		&character.Z,
		&character.UpdatedAt,
		&raw,
	); err != nil {
		return nil, err
	}
	if len(raw) == 0 {
		raw = []byte("[]")
	}
	if err := json.Unmarshal(raw, &character.Inventory); err != nil {
		return nil, err
	}
	return &character, nil
}
