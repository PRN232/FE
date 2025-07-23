# Base image with Node
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

################################################################################
# Install production dependencies
FROM base AS deps

# Add compatibility libs for some native packages like sharp
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --no-audit --no-fund --loglevel=error

################################################################################
# Build the application
FROM base AS build

# Add env for public access
ENV NEXT_PUBLIC_APP_ENV=$APP_ENV

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Install dev dependencies needed during build
RUN npm install typescript eslint sharp --no-audit --no-fund --loglevel=error
RUN npm run build

################################################################################
# Create final runtime image
FROM base AS final

WORKDIR /usr/src/app

# Install sharp at runtime if needed for image optimization
RUN npm install sharp --no-audit --no-fund --loglevel=error

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy app artifacts
COPY --from=build --chown=nextjs:nodejs /usr/src/app/public ./public
COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# Clean up source maps
RUN cd .next && find . -name "*.map" -type f -delete

# Set non-root user
USER nextjs

EXPOSE 2006
ENV PORT=2006
ENV NODE_ENV=production

# Start the app
CMD ["node", "server.js"]
