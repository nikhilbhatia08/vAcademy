# Build stage
FROM node:21.6.2-bullseye-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends init

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:21.6.2-bullseye-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app .

COPY --chown=node:node . .

EXPOSE 3000

USER node

CMD ["npm", "run", "dev"]
