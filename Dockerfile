# Stage 1: Build with Bun
FROM oven/bun:1.0.36 as builder

WORKDIR /app

# Copy package files and configs
COPY package.json bun.lockb tsconfig.json vite.config.ts ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the app (combines TypeScript check and Vite build)
RUN bun run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]