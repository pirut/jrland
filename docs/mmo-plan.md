# MMO Plan (Shared World Rethink)

## Target Game
- Browser-first low-poly survival MMO.
- One persistent logical world for every player.
- Building, mining, crafting, storage, wildlife, and social cooperation from day one.
- "Minecraft-like" in persistence and player expression, but simpler, lighter, and more stylized.

## Product Direction
- Move from 2D prototype thinking to a 3D low-poly world with readable silhouettes, strong lighting, and simple materials.
- Keep the early survival loop bare bones:
  - gather wood, stone, food
  - place structures
  - craft tools
  - survive day/night and weather
- Prioritize shared-world verbs over feature count:
  - see other players
  - mine the same terrain
  - build in the same place
  - leave persistent changes behind

## Core Architecture Decision
- The world must be authoritative on the server.
- "Everyone on the same world" should mean one logical world, not one giant process.
- The backend should be a set of region servers that together own one shared map.
- Clients should render, predict short movements, and send intents. They should not own truth.

## What Changes From The Current Prototype

### Keep
- Chunk-based world generation as a design concept.
- Minimal survival loop and modular gameplay systems.
- Browser client and thin UI/HUD approach.

### Discard
- Client-owned world simulation as the source of truth.
- Full-state player snapshots being treated as authoritative.
- SpacetimeDB as the main world simulation backend.
- Room/session thinking for the main world.

## Recommended Backend

### Best Overall Choice
- Custom authoritative world servers orchestrated with Agones on Kubernetes.

### Recommended Stack
- World simulation: Go or Rust dedicated servers.
- Orchestration: Agones.
- Gateway/API: TypeScript or Go.
- Persistent data: PostgreSQL.
- Hot cache / presence / lightweight coordination: Redis.
- Snapshot/blob storage: S3-compatible object storage.
- Region handoff / internal events: NATS.

## Why This Is The Best Fit
- A voxel-like survival MMO is primarily a simulation and replication problem, not a database-first problem.
- The hard part is chunk ownership, AOI replication, mining/build deltas, creature AI, and region handoff.
- Agones solves fleet orchestration and dedicated server lifecycle without forcing the game model.
- PostgreSQL is boring in the good way: mature, well understood, and easy to hire for.
- Redis and NATS are optional but practical for presence, routing, and region coordination.

## Why Not SpacetimeDB As The Main Backend
- It is good for rapid real-time sync prototypes.
- It is not the backend I would choose for a persistent, one-world, voxel-survival MMO as the foundation.
- This game needs explicit ownership over simulation ticks, chunk authority, replication policy, and operational scaling.
- SpacetimeDB can still be useful for experiments or tools, but not as the core long-term world backend.

## Secondary Options

### Nakama
- Good if you want auth, friends, chat, parties, inventory/meta services, and platform glue.
- Not my first choice for the main shared-world simulation layer.
- Best use: support services around the world server, not the world server itself.

### Colyseus
- Best short-term option if you want to stay in TypeScript and move fast on a multiplayer prototype.
- Good for authoritative rooms and browser clients.
- I would not choose it as the final architecture for a single persistent MMO world.

### SpacetimeDB
- Best for fast iteration on synchronized state in small-to-medium prototypes.
- Too opinionated and too novel for the core backend of this specific project.

## Shared-World Server Model

### World Topology
- One world seed.
- World divided into chunks.
- Chunks grouped into regions.
- Each region owned by exactly one world server at a time.

### Player Flow
- Client authenticates with gateway.
- Gateway loads character data and resolves spawn.
- Router assigns the player to the correct region server.
- Client opens a real-time connection to that region server.
- Crossing a region border triggers server-to-server handoff while staying in the same world.

### Server Responsibilities
- Terrain/chunk authority.
- Mining/build placement validation.
- Resource respawn and structure persistence.
- Creature AI and combat resolution.
- Interest management and entity replication.
- Anti-cheat validation.

### Client Responsibilities
- Input capture.
- Camera and rendering.
- Short local prediction for movement/interaction feel.
- Interpolation of replicated entities.
- UI and inventory presentation.

## Data Model Direction

### Persistent
- player characters
- inventories
- structures
- modified chunks / voxel deltas
- dropped items with persistence rules
- world metadata

### Ephemeral
- movement state
- combat events
- nearby creature state
- temporary effects
- transient chat delivery

## Technical Rules To Lock In Early
- Never trust the client for world edits.
- Persist chunk deltas, not full regenerated worlds.
- AOI replication is mandatory from the start.
- Design every gameplay system around chunk ownership.
- Build protocol messages around intents and deltas, not giant snapshots.
- Keep auth/social/meta services separate from real-time simulation.

## Repo Implications
- `src/core/Game.js` should stop growing as a single gameplay authority and become mostly client orchestration.
- `src/world/World.js` should become a local rendering/cache view of server-owned chunks, not the permanent world source.
- `backend/spacetimedb` should be treated as a prototype branch, not the target backend.
- Network code should be redesigned around:
  - connect
  - subscribe to chunk/region state
  - send player intents
  - receive authoritative deltas
  - handle correction and handoff

## Suggested Build Order

### Phase 1: New Foundation
- Pick the server stack.
- Define the network protocol.
- Stand up one authoritative region server.
- Move movement, mining, build placement, and inventory truth to the server.

### Phase 2: Visual Reset
- Replace the 2D presentation with a low-poly 3D renderer.
- Keep art simple: flat-shaded materials, good shadows, strong sky/fog, clean silhouettes.
- Make the world visually pleasing through lighting and shape language, not texture complexity.

### Phase 3: Persistent Shared World
- Persist chunk edits and structures.
- Add multi-player building/mining on the same land.
- Add reconnect/resume and crash-safe snapshots.

### Phase 4: Regionization
- Split the world into region processes.
- Add seamless border handoff.
- Add AOI-based replication and load shedding.

### Phase 5: MMO Services
- Add chat, parties, guilds, moderation, trading, and account progression around the world simulation.

## Final Recommendation
- If the goal is a real long-term shared-world survival MMO, do not build the main backend around SpacetimeDB.
- Build custom authoritative world servers and run them on Agones.
- If you need a fast transitional step while staying in JavaScript, use Colyseus only as a prototype bridge, not the end state.
- If you want a product to pair with the custom server stack for auth/social/meta, Nakama is the most reasonable companion option.
