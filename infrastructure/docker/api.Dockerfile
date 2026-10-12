# Multi-stage Dockerfile for Backend (Node.js & Express API Server)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package configurations
COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY server/package.json ./server/

# Install dependencies
RUN npm ci

# Copy shared code & server source
COPY packages/shared ./packages/shared
COPY server ./server

# Build shared and server
RUN npm run build --workspace=@thepapare/shared
RUN npm run build --workspace=thepapare-server

# Production Runner
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY server/package.json ./server/

RUN npm ci --omit=dev

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/server/dist ./server/dist

EXPOSE 5000

CMD ["npm", "run", "start", "--workspace=thepapare-server"]

