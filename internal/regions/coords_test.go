package regions

import "testing"

func TestParseRegionID(t *testing.T) {
	coord, err := ParseRegionID("region--2-3")
	if err != nil {
		t.Fatalf("parse region id: %v", err)
	}
	if coord.X != -2 || coord.Z != 3 {
		t.Fatalf("unexpected coord: %+v", coord)
	}
}

func TestRegionIDForPosition(t *testing.T) {
	if got := RegionIDForPosition(15, 15); got != "region-0-0" {
		t.Fatalf("unexpected origin region: %s", got)
	}
	if got := RegionIDForPosition(256, 0); got != "region-1-0" {
		t.Fatalf("unexpected east region: %s", got)
	}
	if got := RegionIDForPosition(-1, 0); got != "region--1-0" {
		t.Fatalf("unexpected west region: %s", got)
	}
}
