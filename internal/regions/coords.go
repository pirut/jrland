package regions

import (
	"fmt"
	"math"
)

const (
	ChunkSizeX    = 16
	ChunkSizeZ    = 16
	RegionChunksX = 16
	RegionChunksZ = 16
	RegionSizeX   = ChunkSizeX * RegionChunksX
	RegionSizeZ   = ChunkSizeZ * RegionChunksZ
)

type Coord struct {
	X int32
	Z int32
}

func ParseRegionID(regionID string) (Coord, error) {
	var coord Coord
	if _, err := fmt.Sscanf(regionID, "region-%d-%d", &coord.X, &coord.Z); err == nil {
		return coord, nil
	}
	if _, err := fmt.Sscanf(regionID, "region-%d", &coord.X); err == nil {
		coord.Z = 0
		return coord, nil
	}
	return Coord{}, fmt.Errorf("invalid region id %q", regionID)
}

func FormatRegionID(x, z int32) string {
	return fmt.Sprintf("region-%d-%d", x, z)
}

func RegionIDForPosition(worldX, worldZ float64) string {
	coord := RegionForPosition(worldX, worldZ)
	return FormatRegionID(coord.X, coord.Z)
}

func RegionForPosition(worldX, worldZ float64) Coord {
	return Coord{
		X: int32(floorDiv(int(math.Floor(worldX)), RegionSizeX)),
		Z: int32(floorDiv(int(math.Floor(worldZ)), RegionSizeZ)),
	}
}

func Bounds(regionID string) (minX, maxX, minZ, maxZ int, err error) {
	coord, err := ParseRegionID(regionID)
	if err != nil {
		return 0, 0, 0, 0, err
	}
	minX = int(coord.X) * RegionSizeX
	maxX = minX + RegionSizeX
	minZ = int(coord.Z) * RegionSizeZ
	maxZ = minZ + RegionSizeZ
	return minX, maxX, minZ, maxZ, nil
}

func Contains(regionID string, worldX, worldZ float64) bool {
	minX, maxX, minZ, maxZ, err := Bounds(regionID)
	if err != nil {
		return false
	}
	x := int(math.Floor(worldX))
	z := int(math.Floor(worldZ))
	return x >= minX && x < maxX && z >= minZ && z < maxZ
}

func floorDiv(value, base int) int {
	if value >= 0 {
		return value / base
	}
	return -int(math.Ceil(float64(-value) / float64(base)))
}
