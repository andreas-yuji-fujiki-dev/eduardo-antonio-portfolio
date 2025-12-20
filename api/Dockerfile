FROM node:20-alpine

WORKDIR /usr/src/app

# Instala as dependências do sistema necessárias
RUN apk add --no-cache openssl

# Copia os arquivos de definição de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências
RUN npm ci --only=production

# Instala dependências de desenvolvimento separadamente (se necessário para build)
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila TypeScript
RUN npm run build

# Expõe a porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]