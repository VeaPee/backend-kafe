#!/bin/sh
set -e

# Check if there are any running containers
if [ "$(docker ps -q)" ]; then
    # Stop all running containers
    echo "Stopping all running Docker containers..."
    docker stop $(docker ps -q)

    # # Optionally, remove all stopped containers
    docker rm $(docker ps -a -q)
    
    echo "All Docker containers have been stopped."
else
    echo "No running Docker containers found."
fi

# Delete all images (including untagged ones)
docker rmi $(docker images -a -q)
echo "All Docker images have been deleted."