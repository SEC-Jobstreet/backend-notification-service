FROM node:20-alpine AS development
ENV NODE_ENV=development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 4001
# Start the app
CMD [ "npm", "start" ]

FROM node:20-alpine AS builder
ENV NODE_ENV=production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install --production
# Copy app files
COPY . .
# Build
RUN npm run build

FROM node:20-alpine AS production
# Copy built assets/bundle from the builder
COPY --from=builder /app/build .
EXPOSE 4001
# Start the app
CMD node app.js