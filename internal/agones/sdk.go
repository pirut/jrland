package agones

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type SDKClient struct {
	baseURL string
	client  *http.Client
}

type SDKGameServer struct {
	ObjectMeta struct {
		Name      string            `json:"name"`
		Namespace string            `json:"namespace"`
		Labels    map[string]string `json:"labels"`
	} `json:"object_meta"`
	Status struct {
		State   string           `json:"state"`
		Address string           `json:"address"`
		Ports   []allocationPort `json:"ports"`
	} `json:"status"`
}

func NewSDKClient(port string) *SDKClient {
	if port == "" {
		return nil
	}
	return &SDKClient{
		baseURL: "http://localhost:" + port,
		client: &http.Client{
			Timeout: 3 * time.Second,
		},
	}
}

func (c *SDKClient) Enabled() bool {
	return c != nil && c.baseURL != ""
}

func (c *SDKClient) Ready(ctx context.Context) error {
	return c.postJSON(ctx, "/ready", map[string]any{})
}

func (c *SDKClient) Health(ctx context.Context) error {
	return c.postJSON(ctx, "/health", map[string]any{})
}

func (c *SDKClient) GetGameServer(ctx context.Context) (*SDKGameServer, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, c.baseURL+"/gameserver", nil)
	if err != nil {
		return nil, err
	}
	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("agones gameserver endpoint returned %d", res.StatusCode)
	}
	var gameServer SDKGameServer
	if err := json.NewDecoder(res.Body).Decode(&gameServer); err != nil {
		return nil, err
	}
	return &gameServer, nil
}

func (c *SDKClient) postJSON(ctx context.Context, path string, payload any) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+path, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	res, err := c.client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 400 {
		return fmt.Errorf("agones sdk %s returned %d", path, res.StatusCode)
	}
	return nil
}
