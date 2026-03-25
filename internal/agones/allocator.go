package agones

import (
	"bytes"
	"context"
	"crypto/tls"
	"crypto/x509"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

type AllocatorConfig struct {
	Endpoint           string
	Namespace          string
	FleetName          string
	PortName           string
	WorldScheme        string
	ClientCertFile     string
	ClientKeyFile      string
	CACertFile         string
	InsecureSkipVerify bool
	Timeout            time.Duration
}

type Allocation struct {
	GameServerName string
	NodeName       string
	Address        string
	Port           int32
	Endpoint       string
}

type Allocator struct {
	endpoint string
	config   AllocatorConfig
	client   *http.Client
}

type allocationRequest struct {
	Namespace string               `json:"namespace"`
	Selectors []allocationSelector `json:"selectors"`
	Metadata  *allocationMetadata  `json:"metadata,omitempty"`
}

type allocationSelector struct {
	MatchLabels map[string]string `json:"matchLabels,omitempty"`
}

type allocationMetadata struct {
	Labels      map[string]string `json:"labels,omitempty"`
	Annotations map[string]string `json:"annotations,omitempty"`
}

type allocationResponse struct {
	GameServerName string           `json:"gameServerName"`
	NodeName       string           `json:"nodeName"`
	Address        string           `json:"address"`
	Ports          []allocationPort `json:"ports"`
}

type allocationPort struct {
	Name string `json:"name"`
	Port int32  `json:"port"`
}

func NewAllocator(cfg AllocatorConfig) (*Allocator, error) {
	if cfg.Endpoint == "" {
		return nil, fmt.Errorf("allocator endpoint is required")
	}
	endpoint, err := normalizeAllocatorEndpoint(cfg.Endpoint)
	if err != nil {
		return nil, err
	}
	if cfg.Timeout <= 0 {
		cfg.Timeout = 5 * time.Second
	}
	if cfg.Namespace == "" {
		cfg.Namespace = "default"
	}
	if cfg.FleetName == "" {
		cfg.FleetName = "worldd-main"
	}
	if cfg.PortName == "" {
		cfg.PortName = "world"
	}
	if cfg.WorldScheme == "" {
		cfg.WorldScheme = "ws"
	}

	client, err := newAllocatorHTTPClient(cfg)
	if err != nil {
		return nil, err
	}
	return &Allocator{
		endpoint: endpoint,
		config:   cfg,
		client:   client,
	}, nil
}

func (a *Allocator) Allocate(ctx context.Context, worldID, regionID string) (*Allocation, error) {
	requestBody := allocationRequest{
		Namespace: a.config.Namespace,
		Selectors: []allocationSelector{
			{
				MatchLabels: map[string]string{
					"agones.dev/fleet": a.config.FleetName,
				},
			},
		},
		Metadata: &allocationMetadata{
			Labels: map[string]string{
				"jrland.dev/world":  worldID,
				"jrland.dev/region": regionID,
			},
			Annotations: map[string]string{
				"jrland.dev/world":  worldID,
				"jrland.dev/region": regionID,
			},
		},
	}

	payload, err := json.Marshal(requestBody)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, a.endpoint, bytes.NewReader(payload))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	res, err := a.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	if res.StatusCode >= 400 {
		return nil, fmt.Errorf("agones allocator returned %d: %s", res.StatusCode, strings.TrimSpace(string(body)))
	}

	var response allocationResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, err
	}
	port, err := pickPort(response.Ports, a.config.PortName)
	if err != nil {
		return nil, err
	}
	endpoint, err := buildWorldEndpoint(response.Address, port.Port, a.config.WorldScheme)
	if err != nil {
		return nil, err
	}
	return &Allocation{
		GameServerName: response.GameServerName,
		NodeName:       response.NodeName,
		Address:        response.Address,
		Port:           port.Port,
		Endpoint:       endpoint,
	}, nil
}

func buildWorldEndpoint(address string, port int32, scheme string) (string, error) {
	if address == "" || port <= 0 {
		return "", fmt.Errorf("invalid world endpoint")
	}
	if scheme == "" {
		scheme = "ws"
	}
	return fmt.Sprintf("%s://%s:%d/world", scheme, address, port), nil
}

func normalizeAllocatorEndpoint(raw string) (string, error) {
	parsed, err := url.Parse(raw)
	if err != nil {
		return "", err
	}
	if parsed.Scheme == "" || parsed.Host == "" {
		return "", fmt.Errorf("allocator endpoint must include scheme and host")
	}
	if parsed.Path == "" || parsed.Path == "/" {
		parsed.Path = "/gameserverallocation"
	}
	return parsed.String(), nil
}

func pickPort(ports []allocationPort, portName string) (*allocationPort, error) {
	if len(ports) == 0 {
		return nil, fmt.Errorf("allocation response did not include any ports")
	}
	if portName == "" {
		return &ports[0], nil
	}
	for _, port := range ports {
		if port.Name == portName {
			return &port, nil
		}
	}
	return &ports[0], nil
}

func newAllocatorHTTPClient(cfg AllocatorConfig) (*http.Client, error) {
	tlsConfig := &tls.Config{
		InsecureSkipVerify: cfg.InsecureSkipVerify,
		MinVersion:         tls.VersionTLS12,
	}

	if cfg.ClientCertFile != "" || cfg.ClientKeyFile != "" {
		if cfg.ClientCertFile == "" || cfg.ClientKeyFile == "" {
			return nil, fmt.Errorf("allocator client cert and key must both be set")
		}
		cert, err := tls.LoadX509KeyPair(cfg.ClientCertFile, cfg.ClientKeyFile)
		if err != nil {
			return nil, err
		}
		tlsConfig.Certificates = []tls.Certificate{cert}
	}

	if cfg.CACertFile != "" {
		caPEM, err := os.ReadFile(cfg.CACertFile)
		if err != nil {
			return nil, err
		}
		pool := x509.NewCertPool()
		if !pool.AppendCertsFromPEM(caPEM) {
			return nil, fmt.Errorf("allocator ca file did not contain a valid certificate")
		}
		tlsConfig.RootCAs = pool
	}

	return &http.Client{
		Timeout: cfg.Timeout,
		Transport: &http.Transport{
			TLSClientConfig: tlsConfig,
		},
	}, nil
}
