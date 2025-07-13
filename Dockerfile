# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài thêm một số tiện ích nếu cần debug hoặc build native packages
RUN apk add --no-cache libc6-compat

################################################################################
# Install dependencies (production-only)
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

################################################################################
# Build project
FROM base AS build

# Copy toàn bộ mã nguồn và cài devDependencies
COPY . .
RUN npm ci

# Build Next.js app
RUN npm run build

################################################################################
# Final production image
FROM node:${NODE_VERSION}-alpine AS final

WORKDIR /app
ENV NODE_ENV=production
USER node

# Copy chỉ những gì cần thiết
COPY --chown=node:node package.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/.next ./.next

# Next.js cần file config nếu có custom alias
COPY --chown=node:node next.config.ts ./
COPY --chown=node:node tsconfig.json ./

EXPOSE 2006
CMD ["npm", "start"]
