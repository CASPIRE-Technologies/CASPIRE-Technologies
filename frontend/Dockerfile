FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig*.json angular.json ./
RUN npm ci

COPY src ./src
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist/company-website-frontend ./dist/company-website-frontend

EXPOSE 4000

CMD ["node", "dist/company-website-frontend/server/server.mjs"]
