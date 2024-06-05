#!/bin/sh
set -e

# Stop the running container (if any)
echo "Stopping all running Docker containers..."

# Stop all running containers
docker stop $(docker ps -q)

# Optionally, you can also remove all stopped containers
docker rm $(docker ps -a -q)

echo "All Docker containers have been stopped and removed."
