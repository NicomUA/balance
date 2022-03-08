# ---- Base Node ----
FROM node:16-alpine AS base
# set working directory
WORKDIR /app
# copy project files
COPY package.json yarn.lock ./

# ---- Build ----
FROM base AS builder
RUN yarn install --development --pure-lockfile
COPY . .
RUN yarn build

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN yarn install --prod

# ---- Release ----
FROM base AS release
# copy node_modules
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

# expose port and define CMD
EXPOSE 3000
CMD ["yarn", "start:prod"]
