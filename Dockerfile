# 1. Base image với Node.js
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy file cấu hình trước
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Cài dependencies (gồm ts-node, typescript, v.v.)
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# ✅ DÙNG ts-node để chạy next.config.ts khi build
RUN npm run build

# === Final Image ===
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next .next
COPY --from=base /app/public ./public
COPY --from=base /app/app ./app
COPY --from=base /app/components ./components
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/tsconfig.json ./tsconfig.json
COPY --from=base /app/next.config.ts ./next.config.ts
COPY --from=base /app/next-env.d.ts ./next-env.d.ts

ENV NODE_ENV=production

EXPOSE 2006

CMD ["npm", "start"]
