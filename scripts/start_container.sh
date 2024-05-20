#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull veapee/backend-kafe:latest

export MONGO_URI=$(aws ssm get-parameters --region ap-southeast-2 --names MONGO_URI --with-decryption --query Parameters[0].Value)
export NODE_ENV=$(aws ssm get-parameters --region ap-southeast-2 --names NODE_ENV --with-decryption --query Parameters[0].Value)
export JWT_SECRET=$(aws ssm get-parameters --region ap-southeast-2 --names JWT_SECRET --with-decryption --query Parameters[0].Value)
export EMAIL_HOST=$(aws ssm get-parameters --region ap-southeast-2 --names EMAIL_HOST --with-decryption --query Parameters[0].Value)
export EMAIL_USER=$(aws ssm get-parameters --region ap-southeast-2 --names EMAIL_USER --with-decryption --query Parameters[0].Value)
export EMAIL_PASS=$(aws ssm get-parameters --region ap-southeast-2 --names EMAIL_PASS --with-decryption --query Parameters[0].Value)
export PORT=$(aws ssm get-parameters --region ap-southeast-2 --names PORT --with-decryption --query Parameters[0].Value)

# Run the Docker image as a container
docker run -dit -p 80:80 veapee/backend-kafe