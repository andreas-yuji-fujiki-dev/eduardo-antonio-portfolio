FROM node:20-alpine AS builder

# Receber variáveis no build
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ARG JWT_SECRET=dfff9d0f5f5c9745b90b8d392bd2e7e0

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Criar .env.production com as variáveis
RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" > .env.production && \
    echo "JWT_SECRET=${JWT_SECRET}" >> .env.production

# Build da aplicação Next.js
RUN npm run build

# Estágio de produção
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002
# Passar as variáveis também no runtime
ENV NEXT_PUBLIC_API_URL=http://localhost:3001
ENV JWT_SECRET=dfff9d0f5f5c9745b90b8d392bd2e7e0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3002

CMD ["npm", "start"]