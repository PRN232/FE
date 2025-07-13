# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

# Dùng đúng thư mục chứa mã nguồn thực tế
WORKDIR /app

# Tùy chọn: cài thêm tiện ích nếu cần build native packages
RUN apk add --no-cache libc6-compat

################################################################################
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

################################################################################
FROM base AS build

# Copy toàn bộ mã nguồn và file cấu hình
COPY . .
COPY next.config.ts ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

################################################################################
FROM node:${NODE_VERSION}-alpine AS final

WORKDIR /app
ENV NODE_ENV=production
USER node

COPY --chown=node:node package.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/.next ./.next

EXPOSE 2006
CMD ["npm", "start"]
