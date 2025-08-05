# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build React app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]


