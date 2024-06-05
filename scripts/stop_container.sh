#!/bin/bash
# Stop all running containers
docker stop $(docker ps -q)

# Optionally, you can also remove all stopped containers
docker rm $(docker ps -a -q)