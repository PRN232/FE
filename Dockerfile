# 1. Base image với Node.js
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

# Tạo thư mục app
WORKDIR /app

# Cài thêm các dependency hệ thống cần thiết
RUN apk add --no-cache libc6-compat

# Copy file cấu hình trước để tận dụng cache
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Cài đặt các dependency (dùng npm ở đây, có thể thay bằng yarn hoặc pnpm tùy project)
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build Next.js project (production)
RUN npm run build

# === Final Image: chỉ chứa mã đã build ===
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy runtime files từ stage base
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
