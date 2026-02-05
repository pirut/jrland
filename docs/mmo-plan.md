# MMO Plan (SpacetimeDB-ready)

## Target Vision
- Single persistent world with millions of concurrent players.
- Authoritative backend with deterministic simulation and strict interest management.
- Client runs as a thin renderer + input sender.

## Core Assumptions
- Scale requires world partitioning (regions/shards) + aggressive interest management.
- Simulation must be ticked on the server (authoritative) with deterministic inputs.
- The client should tolerate eventual consistency and render snapshots with interpolation.

## World Partitioning Strategy
- World is already chunked for terrain; extend chunk IDs to be region keys.
- Introduce "Region" workers on the backend. Each region owns a set of chunks.
- A dynamic router assigns players to regions based on position.
- Cross-region handoff is done by transferring player ownership to the adjacent region.

## Interest Management
- Server computes AOI (Area of Interest) based on player position.
- Each player subscribes to relevant entities (resources, structures, creatures, players).
- Updates are deltas per tick, not full snapshots.
- Use coarse grids (e.g., chunk or sub-chunk) to reduce broadcast fan-out.

## SpacetimeDB Mapping
- Tables:
  - `players`: position, stats, inventory, gear, active quest, region_id
  - `structures`: type, origin, size, rotation, owner, region_id
  - `resources`: type, position, respawn_at, region_id
  - `creatures`: type, position, hp, state, region_id
  - `events`: world events per region + season/time state
  - `actions`: input stream for validation + replay (optional)
- Reducers:
  - `apply_input`: consume player input events (move, gather, build, chat, attack)
  - `tick_region`: advances region simulation in fixed timesteps
  - `handoff_player`: migrates player record between regions

## Current Local Schema (v0)
- Tables:
  - `player` (id, name, x, y, health, hunger, stamina, region, connected, lastSeen)
  - `player_input` (id, keys, moveTarget, pointer, build, mode, inventoryOpen, updatedAt)
  - `chat` (id, sender, message, time)
  - `world` (id, seed, timeOfDay, lastTick)
- Reducers:
  - `input_sample` (client input + position snapshot)
  - `send_chat` (chat messages)
  - `set_seed` (initialize world seed)

## Client Integration Plan
- Replace `LocalNetAdapter` with `SpacetimeNetAdapter`.
- Client sends actions (input/move/build/chat) as messages; server validates and applies.
- Client receives authoritative snapshots or deltas.
- Client interpolates positions of remote players and creatures.
- Client can be started with `?net=spacetime&endpoint=ws://localhost:3000&region=region-0&module=jrland` to toggle the adapter.

## Security/Consistency
- Server validates all world changes (gather/build/attack).
- Client-side actions are optimistic but corrected by server snapshots.
- Use rate limits and reject invalid action sequences.

## Reliability
- Periodic snapshot of region state for recovery.
- Event sourcing for player actions when needed.

## Next Steps
- Introduce a server tick clock and global time authority.
- Move randomness to server-side seeds and deterministic RNG per region.
- Move AI and world events to server simulation.
- Build an integration harness to replay inputs deterministically.
