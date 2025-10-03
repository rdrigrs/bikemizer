# 🐳 Dockerfile para BikeMizer - Otimizado para Kubernetes
FROM node:20-alpine

# Instalar dependências do sistema
RUN apk add --no-cache \
    dumb-init \
    && addgroup -g 1001 -S nodejs \
    && adduser -S bikemizer -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências (incluindo devDependencies para build)
RUN npm ci && npm cache clean --force

# Copiar código fonte
COPY . .

# Build do frontend
RUN npm run build

# Criar diretório para uploads e ajustar permissões
RUN mkdir -p /app/dist/uploads && \
    chown -R bikemizer:nodejs /app

# Mudar para usuário não-root
USER bikemizer

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Health check para Kubernetes
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando de inicialização
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]

