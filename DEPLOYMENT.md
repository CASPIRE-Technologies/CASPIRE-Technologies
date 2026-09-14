Deployment steps for Oracle VPS

Prerequisites on the VPS:
- Docker and Docker Compose installed
- Open ports: 80, 443, 3000, 3306 (or adjust according to your needs)

Options:
1) Build and run on the VPS (recommended for small projects)

Commands (run in repository root):
```bash
# build images and start services in background
docker-compose build --pull
docker-compose up -d --remove-orphans

# view logs
docker-compose logs -f backend

# stop
docker-compose down
```

2) Build locally and push to a registry (Docker Hub/OCI Registry), then pull on VPS
- Tag and push images, then update `docker-compose.yml` to use image names instead of build contexts.

Notes:
- Ensure production environment variables are provided securely (use an `.env` file and reference it from `docker-compose.yml`, or use secrets).
- Consider using a reverse proxy (nginx, Caddy) on the VPS to terminate TLS and forward to the frontend (port 80 in container) and backend (port 3000).
- For MySQL, prefer running on a managed DB or separate container with persistent volume already defined (`mysql_data` present).
- Run `npm run build` locally to verify builds before deploying.
- If using Prisma, run migrations or `prisma generate` as part of your deploy process.
