# Use an official Node.js runtime as a parent image
FROM node:20.11.1-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the build output to the web server's root directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

