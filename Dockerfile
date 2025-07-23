# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat

################################################################################
# Install all dependencies including devDependencies
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --loglevel=error

################################################################################
# Build the Next.js app
FROM base AS build

ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app (make sure tsconfig paths work here)
RUN npm run build

################################################################################
# Create final optimized image
FROM base AS final

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

WORKDIR /app

# Copy only the necessary build outputs
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./

# Remove source maps
RUN find .next -name "*.map" -type f -delete

USER nextjs
EXPOSE 2006
ENV PORT=2006

CMD ["node", "server.js"]
