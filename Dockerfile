# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat

################################################################################
# Install all dependencies (including devDependencies)
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --loglevel=error

################################################################################
# Build the application
FROM base AS build

# NODE_ENV=production is NOT set here to allow full devDependencies usage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

################################################################################
# Final runtime image
FROM base AS final

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

WORKDIR /app

# Copy only necessary build output
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./

# Optional: clean up source maps
RUN find .next -name "*.map" -type f -delete

USER nextjs
EXPOSE 2006
ENV PORT=2006

CMD ["node", "server.js"]
