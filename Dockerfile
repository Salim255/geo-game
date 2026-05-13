###############################################
# 1. BUILD STAGE
# This stage compiles the Angular/Ionic app.
# It uses Node.js because Angular CLI runs on Node.
###############################################
FROM node:20 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package files first (best caching)
# If package.json doesn't change, npm install is cached.
COPY package*.json ./

# RUN echo "----- package.json -----" && cat package.json | grep hono || echo "No hono in package.json"

# Debug: check package-lock.json contents for hono
# RUN echo "----- package-lock.json -----" && cat package-lock.json | grep hono || echo "No hono in package-lock.json"

# Install dependencies
RUN npm install

# Copy the rest of the client source code
COPY . .

# Build the Angular/Ionic app for production
# This generates the "www" folder (Ionic) or "dist" folder (Angular)
RUN npm run build -- --configuration production
# orRUN ionic build --configuration production




###############################################
# 2. RUNTIME STAGE
# This stage serves the built app using NGINX.
# It produces a very small, fast, production-ready image.
###############################################
FROM nginx:alpine

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*


# Copy the built app from the builder stage
# Ionic outputs to: www/
# Angular outputs to: dist/<project-name>/
COPY --from=builder /app/www /usr/share/nginx/html

# Copy your custom NGINX configuration to overwrite the default config
# This lets you customize caching, routing, headers, etc.
# Copy your custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 (or 80 if you prefer)
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
