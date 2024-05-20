#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull veapee/backend-kafe:latest

# Run the Docker image as a container
docker run -dit -p 80:80 veapee/backend-kafe