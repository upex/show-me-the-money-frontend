#!/bin/bash

IMAGE_NAME="show-me-the-money-frontend"
CONTAINER_NAME="show-me-the-money-frontend"
HOST_PORT=3000
CONTAINER_PORT=80

# Check if a container with the same name is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping existing container..."
    docker stop $CONTAINER_NAME
fi

# Remove the existing container if it exists
if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    echo "Removing existing container..."
    docker rm $CONTAINER_NAME
fi

# Run the Docker container
echo "Running Docker container..."
docker run -d -p $HOST_PORT:$CONTAINER_PORT --name $CONTAINER_NAME $IMAGE_NAME

echo "Docker container is running at http://localhost:$HOST_PORT"
