#=====================
# builder
#=====================
FROM node:14.17.5 AS builder

WORKDIR /app
COPY . .
RUN echo "Next.js production build"
# COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile \
    && yarn build \
    && yarn rimraf ./out/_next/**/*.js.map ;

# ========================
# runner
# ========================
FROM node:16.13.2-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock yarn.lock

EXPOSE 3000

CMD ["yarn", "start"]
