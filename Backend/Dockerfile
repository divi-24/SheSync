# Backend Development Dockerfile (hot reload)
FROM node:20-alpine

# 1. Working directory
WORKDIR /app

# 2. Dependency installation – copy manifest first for layer caching
COPY package.json package-lock.json ./

RUN npm install && npm install -g nodemon

# 3. Copy source code
COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]
