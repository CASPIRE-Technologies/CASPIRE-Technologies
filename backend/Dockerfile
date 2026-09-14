FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
 RUN npm install --omit=dev --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]
