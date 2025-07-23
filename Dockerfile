ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

################################################################################
# Install all dependencies (including devDependencies) for build
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./

# --production=false ensures devDependencies are installed
RUN npm install --production=false --no-audit --no-fund --loglevel=error

################################################################################
# Build the application
FROM base AS build

ENV NEXT_PUBLIC_APP_ENV=$APP_ENV

WORKDIR /usr/src/app

# Copy installed deps including devDependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Ensure correct tsconfig.json settings (e.g., paths) take effect
RUN npm run build

################################################################################
# Final clean image, only with production deps
FROM base AS final

WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat

# Install production-only dependencies (e.g., sharp)
RUN npm install --omit=dev sharp --no-audit --no-fund --loglevel=error

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy only necessary build output
COPY --from=build --chown=nextjs:nodejs /usr/src/app/public ./public
COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# Clean up source maps to reduce image size
RUN cd .next && find . -name "*.map" -type f -delete

USER nextjs

EXPOSE 2006
ENV PORT=2006
ENV NODE_ENV=production

CMD ["node", "server.js"]
