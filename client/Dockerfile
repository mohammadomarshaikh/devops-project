# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client files
COPY . .

# Build the client application (if using React, Angular, etc.)
RUN npm run build

# Expose the port (typically 3000 for React)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
