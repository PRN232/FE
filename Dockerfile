# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

################################################################################
FROM base as deps

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

################################################################################
FROM deps as build

# Copy toàn bộ mã nguồn vào để có thể build
COPY . .

# Cài thêm dev dependencies nếu cần
RUN npm ci

# Build
RUN npm run build

################################################################################
FROM base as final

ENV NODE_ENV production
USER node

COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

EXPOSE 2006
CMD npm start
