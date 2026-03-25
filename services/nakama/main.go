package main

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/heroiclabs/nakama-common/runtime"
)

type worldResolveRequest struct {
	UserID      string `json:"userId"`
	Username    string `json:"username"`
	CharacterID string `json:"characterId,omitempty"`
}

// noinspection GoUnusedExportedFunction
func InitModule(_ context.Context, logger runtime.Logger, _ *sql.DB, _ runtime.NakamaModule, initializer runtime.Initializer) error {
	if err := initializer.RegisterRpc("world_resolve", rpcWorldResolve(logger)); err != nil {
		return err
	}
	logger.Info("JRLand Nakama runtime loaded.")
	return nil
}

func rpcWorldResolve(logger runtime.Logger) func(context.Context, runtime.Logger, *sql.DB, runtime.NakamaModule, string) (string, error) {
	httpClient := &http.Client{Timeout: 5 * time.Second}
	target := env("WORLD_GATEWAY_URL", "http://world-gateway:8081/internal/world/resolve")

	return func(ctx context.Context, _ runtime.Logger, _ *sql.DB, nk runtime.NakamaModule, payload string) (string, error) {
		userID, ok := ctx.Value(runtime.RUNTIME_CTX_USER_ID).(string)
		if !ok || userID == "" {
			return "", runtime.NewError("missing user id", 3)
		}
		username, _ := ctx.Value(runtime.RUNTIME_CTX_USERNAME).(string)
		if username == "" {
			account, err := nk.AccountGetId(ctx, userID)
			if err == nil {
				username = account.User.Username
			}
		}
		request := worldResolveRequest{
			UserID:   userID,
			Username: username,
		}
		if payload != "" {
			var clientPayload map[string]any
			if err := json.Unmarshal([]byte(payload), &clientPayload); err == nil {
				if characterID, ok := clientPayload["characterId"].(string); ok {
					request.CharacterID = characterID
				}
			}
		}
		body, err := json.Marshal(request)
		if err != nil {
			return "", runtime.NewError("marshal resolve request", 13)
		}
		req, err := http.NewRequestWithContext(ctx, http.MethodPost, target, bytes.NewReader(body))
		if err != nil {
			return "", runtime.NewError("build resolve request", 13)
		}
		req.Header.Set("Content-Type", "application/json")
		res, err := httpClient.Do(req)
		if err != nil {
			logger.Error("world resolve call failed: %v", err)
			return "", runtime.NewError("world unavailable", 14)
		}
		defer res.Body.Close()
		if res.StatusCode >= 400 {
			logger.Error("world resolve returned %d", res.StatusCode)
			return "", runtime.NewError("world unavailable", 14)
		}
		var payloadBytes bytes.Buffer
		if _, err := payloadBytes.ReadFrom(res.Body); err != nil {
			return "", runtime.NewError("read resolve response", 13)
		}
		return payloadBytes.String(), nil
	}
}

func env(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
