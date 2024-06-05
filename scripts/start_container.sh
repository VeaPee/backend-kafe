#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull veapee/backend-kafe:latest

# Fetch and print parameters for debugging
MONGO_URI=$(aws ssm get-parameters --region ap-southeast-2 --names MONGO_URI --with-decryption --query Parameters[0].Value --output text)
echo "MONGO_URI: $MONGO_URI"

NODE_ENV=$(aws ssm get-parameters --region ap-southeast-2 --names NODE_ENV --with-decryption --query Parameters[0].Value --output text)
echo "NODE_ENV: $NODE_ENV"

JWT_SECRET=$(aws ssm get-parameters --region ap-southeast-2 --names JWT_SECRET --with-decryption --query Parameters[0].Value --output text)
echo "JWT_SECRET: $JWT_SECRET"

EMAIL_HOST=$(aws ssm get-parameters --region ap-southeast-2 --names EMAIL_HOST --with-decryption --query Parameters[0].Value --output text)
echo "EMAIL_HOST: $EMAIL_HOST"

EMAIL_USER=$(aws ssm get-parameters --region ap-southeast-2 --names EMAIL_USER --with-decryption --query Parameters[0].Value --output text)
echo "EMAIL_USER: $EMAIL_USER"

EMAIL_PASS=$(aws ssm get-parameters --region ap-southeast-2 --names EMAIL_PASS --with-decryption --query Parameters[0].Value --output text)
echo "EMAIL_PASS: $EMAIL_PASS"

PORT=$(aws ssm get-parameters --region ap-southeast-2 --names PORT --with-decryption --query Parameters[0].Value --output text)
echo "PORT: $PORT"

CLOUDINARY_NAME=$(aws ssm get-parameters --region ap-southeast-2 --names CLOUDINARY_NAME --with-decryption --query Parameters[0].Value --output text)
echo "CLOUDINARY_NAME: $CLOUDINARY_NAME"

CLOUDINARY_API_KEY=$(aws ssm get-parameters --region ap-southeast-2 --names CLOUDINARY_API_KEY --with-decryption --query Parameters[0].Value --output text)
echo "CLOUDINARY_API_KEY: $CLOUDINARY_API_KEY"

CLOUDINARY_SECRET=$(aws ssm get-parameters --region ap-southeast-2 --names CLOUDINARY_SECRET --with-decryption --query Parameters[0].Value --output text)
echo "CLOUDINARY_SECRET: $CLOUDINARY_SECRET"

# Run the Docker image as a container
docker run -dit -p 80:80 \
  -e MONGO_URI="$MONGO_URI" \
  -e NODE_ENV="$NODE_ENV" \
  -e JWT_SECRET="$JWT_SECRET" \
  -e EMAIL_HOST="$EMAIL_HOST" \
  -e EMAIL_USER="$EMAIL_USER" \
  -e EMAIL_PASS="$EMAIL_PASS" \
  -e PORT="$PORT" \
  -e PORT="$CLOUDINARY_NAME" \
  -e PORT="$CLOUDINARY_API_KEY" \
  -e PORT="$CLOUDINARY_SECRET" \
  veapee/backend-kafe
