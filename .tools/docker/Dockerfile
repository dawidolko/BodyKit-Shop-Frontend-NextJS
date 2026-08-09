# syntax=docker/dockerfile:1.7

# =============================================================================
# BodyKit Shop - obraz produkcyjny
#
# Budowanie wieloetapowe: Node kompiluje statyczny eksport, nginx go serwuje.
# Obraz koncowy nie zawiera Node'a ani zaleznosci - wazy kilkadziesiat MB.
#
# Budowanie z katalogu glownego repozytorium:
#   docker build -f .tools/docker/Dockerfile -t bodykit-shop .
# =============================================================================

# ---------- Etap 1: zaleznosci ----------
FROM node:22-alpine AS deps
WORKDIR /app

# Instalujemy wylacznie na podstawie manifestow, zeby warstwa trafiala
# do cache i nie unewazniala sie przy kazdej zmianie kodu.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- Etap 2: budowanie ----------
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Adres publiczny i basePath moga sie roznic zaleznie od miejsca wdrozenia.
# Domyslnie pusty basePath - obraz serwuje aplikacje z korzenia domeny.
ARG NEXT_PUBLIC_BASE_PATH=""
ARG NEXT_PUBLIC_SITE_URL="http://localhost:8080"
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---------- Etap 3: serwowanie ----------
FROM nginx:1.27-alpine AS runner

# Usun domyslna konfiguracje, zeby nie nadpisywala naszej.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY .tools/docker/nginx.conf /etc/nginx/conf.d/bodykit.conf
# Snippet poza conf.d - katalog conf.d jest wciagany wzorcem *.conf do
# kontekstu http, gdzie add_header ma inne znaczenie i psulby konfiguracje.
RUN mkdir -p /etc/nginx/snippets
COPY .tools/docker/security-headers.conf /etc/nginx/snippets/security-headers.conf

COPY --from=builder /app/out /usr/share/nginx/html

# nginx:alpine zawiera juz uzytkownika nginx (uid 101) - proces roboczy
# dziala na nim, wiec katalogi tymczasowe musza byc dla niego zapisywalne.
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

USER nginx

CMD ["nginx", "-g", "daemon off;"]
