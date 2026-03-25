# GKE Notes

This repo currently ships the application code and first-pass Agones manifests. For GKE rollout:

1. Create a `GKE Standard` cluster.
2. Install Agones into the cluster.
3. Provision:
   - PostgreSQL
   - Redis
   - NATS
   - object storage
4. Deploy `world-gateway` as a normal Kubernetes Deployment.
5. Deploy `worldd-main` with the Fleet manifest in `infra/agones`.
6. Point the world-gateway allocator client at the Agones allocator service.

The current repo includes the `worldd` Fleet and autoscaler as the starting point for that rollout.
