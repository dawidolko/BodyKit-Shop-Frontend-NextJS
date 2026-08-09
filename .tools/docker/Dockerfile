# syntax=docker/dockerfile:1.7

# =============================================================================
# BodyKit Shop - production image
#
# Multi-stage build: Node compiles the static export, nginx serves it.
# The final image contains neither Node nor the dependencies - it weighs
# a few dozen MB.
#
# Build from the repository root:
#   docker build -f .tools/docker/Dockerfile -t bodykit-shop .
# =============================================================================

# ---------- Stage 1: dependencies ----------
FROM node:22-alpine AS deps
WORKDIR /app

# Install from the manifests only, so the layer lands in the cache and is
# not invalidated by every change to the source code.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- Stage 2: build ----------
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# The public address and basePath can differ depending on where the app is
# deployed. The basePath defaults to empty - the image serves the application
# from the root of the domain.
ARG NEXT_PUBLIC_BASE_PATH=""
ARG NEXT_PUBLIC_SITE_URL="http://localhost:8080"
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---------- Stage 3: serve ----------
FROM nginx:1.27-alpine AS runner

# Remove the default configuration so it cannot override ours.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY .tools/docker/nginx.conf /etc/nginx/conf.d/bodykit.conf
# The snippet lives outside conf.d - that directory is pulled in with a *.conf
# glob into the http context, where add_header means something different and
# would break the configuration.
RUN mkdir -p /etc/nginx/snippets
COPY .tools/docker/security-headers.conf /etc/nginx/snippets/security-headers.conf

COPY --from=builder /app/out /usr/share/nginx/html

# nginx:alpine already ships the unprivileged nginx user (uid 101) - the worker
# process runs as that user, so the temporary directories have to be writable
# for it.
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

USER nginx

CMD ["nginx", "-g", "daemon off;"]
