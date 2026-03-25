package regions

import (
	"context"
	"encoding/json"
	"net/url"
	"strings"
	"time"

	"github.com/redis/go-redis/v9"
)

type Owner struct {
	WorldID        string    `json:"worldId"`
	RegionID       string    `json:"regionId"`
	Endpoint       string    `json:"endpoint"`
	HealthURL      string    `json:"healthUrl"`
	GameServerName string    `json:"gameServerName,omitempty"`
	NodeName       string    `json:"nodeName,omitempty"`
	Source         string    `json:"source,omitempty"`
	UpdatedAt      time.Time `json:"updatedAt"`
}

type Registry struct {
	redis *redis.Client
}

func NewRegistry(redisClient *redis.Client) *Registry {
	return &Registry{redis: redisClient}
}

func (r *Registry) Get(ctx context.Context, worldID, regionID string) (*Owner, error) {
	raw, err := r.redis.Get(ctx, ownerKey(worldID, regionID)).Bytes()
	if err != nil {
		if err == redis.Nil {
			return nil, nil
		}
		return nil, err
	}
	var owner Owner
	if err := json.Unmarshal(raw, &owner); err != nil {
		return nil, err
	}
	return &owner, nil
}

func (r *Registry) Put(ctx context.Context, owner *Owner) error {
	if owner == nil {
		return nil
	}
	if owner.UpdatedAt.IsZero() {
		owner.UpdatedAt = time.Now().UTC()
	}
	if owner.HealthURL == "" {
		owner.HealthURL = DeriveHealthURL(owner.Endpoint)
	}
	payload, err := json.Marshal(owner)
	if err != nil {
		return err
	}
	return r.redis.Set(ctx, ownerKey(owner.WorldID, owner.RegionID), payload, 0).Err()
}

func (r *Registry) Delete(ctx context.Context, worldID, regionID string) error {
	return r.redis.Del(ctx, ownerKey(worldID, regionID)).Err()
}

func DeriveHealthURL(endpoint string) string {
	parsed, err := url.Parse(endpoint)
	if err != nil {
		return ""
	}
	switch strings.ToLower(parsed.Scheme) {
	case "ws":
		parsed.Scheme = "http"
	case "wss":
		parsed.Scheme = "https"
	case "http", "https":
	default:
		return ""
	}
	parsed.Path = "/healthz"
	parsed.RawQuery = ""
	parsed.Fragment = ""
	return parsed.String()
}

func ownerKey(worldID, regionID string) string {
	return "world-region-owner:" + worldID + ":" + regionID
}
