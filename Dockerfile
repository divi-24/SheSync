# Frontend Development Dockerfile
FROM node:20-alpine

# 1. Working directory at repo root (for frontend)
WORKDIR /app

# 2. Copy dependency manifest first for cache efficiency
COPY package.json .
COPY package-lock.json .
COPY vite.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY index.html .
COPY styles ./styles
# 3. Install dependencies (deterministic)
RUN npm install 

# 4. Copy frontend source & assets
COPY src ./src
COPY public ./public



# Expose dev port
ENV PORT=5173
EXPOSE 5173

# 6. Start Vite dev server (hot reload) with strictPort so it fails instead of switching
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173", "--strictPort"]
