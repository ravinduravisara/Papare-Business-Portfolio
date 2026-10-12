# Multi-stage Dockerfile for Client (React Router Framework SSR)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package configurations
COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install dependencies
RUN npm ci

# Copy shared code & client source
COPY packages/shared ./packages/shared
COPY client ./client

# Build shared and client
RUN npm run build --workspace=@thepapare/shared
RUN npm run build --workspace=thepapare-client

# Production Runner
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY client/package.json ./client/

RUN npm ci --omit=dev

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/client/build ./client/build
COPY --from=builder /app/client/public ./client/public

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=thepapare-client"]

