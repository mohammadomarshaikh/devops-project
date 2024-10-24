# Stage 1: Build the Client
FROM node:14 as client-build

# Set working directory for client
WORKDIR /usr/src/client

# Copy client package.json and install dependencies
COPY ./client/package*.json ./
RUN npm install

# Copy the rest of the client files
COPY ./client/ ./

# Build the client app
RUN npm run build

# Stage 2: Build the Server
FROM node:14 as server-build

# Set working directory for server
WORKDIR /usr/src/server

# Copy server package.json and install dependencies
COPY ./server/package*.json ./
RUN npm install

# Copy the rest of the server files
COPY ./server/ ./

# Expose server port
EXPOSE 5000

# Stage 3: Final Image with Client and Server
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy server files from server-build
COPY --from=server-build /usr/src/server /usr/src/app/server

# Copy built client from client-build
COPY --from=client-build /usr/src/client/build /usr/src/app/server/client/build

# Set environment variables if needed (optional)
# COPY ./.env ./server/.env

# Expose ports for server and client
EXPOSE 5000
EXPOSE 3000

# Start the server (which serves the built client as well)
CMD ["npm", "start", "--prefix", "./server"]
