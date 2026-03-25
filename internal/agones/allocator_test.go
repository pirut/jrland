package agones

import "testing"

func TestNormalizeAllocatorEndpoint(t *testing.T) {
	actual, err := normalizeAllocatorEndpoint("https://allocator.example.com")
	if err != nil {
		t.Fatalf("normalize endpoint: %v", err)
	}
	if actual != "https://allocator.example.com/gameserverallocation" {
		t.Fatalf("unexpected endpoint: %s", actual)
	}
}

func TestBuildWorldEndpoint(t *testing.T) {
	actual, err := buildWorldEndpoint("10.0.0.25", 7355, "wss")
	if err != nil {
		t.Fatalf("build world endpoint: %v", err)
	}
	if actual != "wss://10.0.0.25:7355/world" {
		t.Fatalf("unexpected endpoint: %s", actual)
	}
}
