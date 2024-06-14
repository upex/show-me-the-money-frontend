#!/bin/bash

# Set variables
IMAGE_NAME="show-me-the-money-frontend"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

echo "Docker build completed..."