FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=builder /app/dist/company-website-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]