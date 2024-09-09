# Use an official Node.js runtime as the base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the server folder
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the shared folder from the root context
COPY shared ./shared

# Copy the rest of the server application code from the server folder
COPY server ./server

# Build the application
RUN npm run build --prefix server

# Set the command to run the application
CMD ["node", "server/dist/server/src/main.js"]