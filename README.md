# JRLand

JRLand is a browser-first shared-world survival MMO prototype built around:

- `Nakama` for auth, sessions, and global chat
- `world-gateway` for ticket issuance and world session resolution
- `worldd` as the authoritative block-world simulation server
- `Three.js` for the low-poly 3D browser client
- `Agones` allocation support for production-style dedicated server orchestration
- `Redis + NATS` for region ownership and handoff transfer coordination

## Local Development

1. Start infrastructure and backend services:

```bash
docker compose -f infra/docker/docker-compose.yml up --build
```

2. In another shell, run the browser client:

```bash
npm run dev
```

3. Open `http://localhost:5173`.

Local Docker development uses the gateway's static world-server fallback.
The compose stack now starts two region servers:

- `region-0-0` on `ws://localhost:7355/world`
- `region-1-0` on `ws://localhost:7356/world`

`worldd` instances self-register into Redis, and region handoffs use the gateway plus NATS transfer messages.

## Home Server Deployment

For a single-box LAN deployment, create `infra/docker/.env` from the example and set the server's LAN IP:

```bash
cp infra/docker/home-server.env.example infra/docker/.env
```

Required values:

- `PUBLIC_HOST` should be the server's LAN IP or DNS name.
- `PUBLIC_API_HOST` should be the public HTTPS hostname for Nakama, for example `api.land.jrbussard.com`.
- `PUBLIC_WORLD_HOST` should be the public WSS hostname for world sockets, for example `world.land.jrbussard.com`.
- `PUBLIC_HTTP_PORT` should match the internal port your router forwards external port `80` to.
- `PUBLIC_WS_SCHEME` should be `wss` for public browser-facing hosting.
- `WORLD_JWT_SECRET` should be changed from the example value.
- `NAKAMA_SERVER_KEY`, console username/password/signing key, session keys, and runtime HTTP key should be changed from the example values.

Then start the full stack:

```bash
docker compose --env-file infra/docker/.env -f infra/docker/docker-compose.yml up --build -d
```

The browser client is still available on the LAN from the `web` container at `http://<PUBLIC_HOST>:<WEB_PORT>`.
For public browser access, terminate TLS on the home server and expose:

- `https://<PUBLIC_API_HOST>` -> Nakama
- `wss://<PUBLIC_WORLD_HOST>/r0/world` -> region `0`
- `wss://<PUBLIC_WORLD_HOST>/r1/world` -> region `1`

Important browser constraint:

- If the website is served over `https://`, the backend endpoints it connects to must also be reachable over secure transports.
- Set `VITE_NAKAMA_HOST` to your public API hostname, for example `api.land.jrbussard.com`.
- Set `VITE_NAKAMA_SSL=true` so the browser uses `https://<PUBLIC_API_HOST>`.
- Set `PUBLIC_WS_SCHEME=wss` so `world-gateway` and `worldd` advertise `wss://...` endpoints instead of insecure `ws://`.
- Browsers will block mixed-content requests from an HTTPS page to insecure `http://` or `ws://` backend URLs.

Production-style Agones allocation is enabled by setting these environment variables on `world-gateway`:

- `AGONES_ALLOCATOR_ENDPOINT`
- `AGONES_NAMESPACE`
- `AGONES_FLEET_NAME`
- `AGONES_PORT_NAME`
- `AGONES_WORLD_SCHEME`
- `AGONES_ALLOCATOR_CERT_FILE`
- `AGONES_ALLOCATOR_KEY_FILE`
- `AGONES_ALLOCATOR_CA_FILE`

## Services

- Web client: `http://localhost:8080`
- Nakama HTTP: `http://localhost:7350`
- Nakama Console: `http://localhost:7351`
- World Server WebSocket (`region-0-0`): `ws://localhost:7355/world`
- World Server WebSocket (`region-1-0`): `ws://localhost:7356/world`

These services stay internal to the Docker network by default:

- `world-gateway`
- PostgreSQL
- Redis
- NATS
- MinIO

## Dev Handoff Commands

While connected to a world server, local chat supports two developer shortcuts for testing region seams:

- `/tp <x> <z>` teleports to a world position
- `/region <x> <z>` teleports to the center of a region coordinate

## Commands

```bash
npm install
npm run proto:generate
npm run build
go test ./...
```
