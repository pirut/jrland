package regions

import "testing"

func TestDeriveHealthURL(t *testing.T) {
	actual := DeriveHealthURL("wss://world.example.com:7443/world?ticket=abc")
	if actual != "https://world.example.com:7443/healthz" {
		t.Fatalf("unexpected health url: %s", actual)
	}
}
