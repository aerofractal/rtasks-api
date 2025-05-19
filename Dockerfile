ARG BUN_VERSION=1.1.27
FROM oven/bun:${BUN_VERSION}-slim AS base

WORKDIR /app
ENV NODE_ENV="production"

FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 git

COPY --link bun.lockb package.json ./
RUN bun install --frozen-lockfile --production

COPY --link ./api ./api

COPY --link ./frontend ./frontend

WORKDIR /app/frontend
RUN bun install --frozen-lockfile --production
RUN bun run build

FROM base
WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["bun", "run", "start"]
