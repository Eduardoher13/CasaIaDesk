# ===== Etapa de build =====
FROM node:20-alpine AS builder

WORKDIR /app

# bcrypt es un módulo nativo: necesita herramientas de compilación.
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Elimina devDependencies pero conserva el binario nativo ya compilado.
RUN npm prune --omit=dev

# ===== Etapa de runtime =====
FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Ejecuta como usuario sin privilegios.
USER node

# El host puede sobrescribir PORT; documentamos el valor por defecto.
EXPOSE 8000

CMD ["node", "dist/main"]
