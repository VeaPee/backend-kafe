#!/bin/bash
set -e

# Pull the Docker image from Docker Hub
docker pull veapee/backend-kafe:latest

MONGO_URI=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name MONGO_URI --with-decryption --query "Parameter.Value" --output text)
NODE_ENV=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name NODE_ENV --with-decryption --query "Parameter.Value" --output text)
JWT_SECRET=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name JWT_SECRET --with-decryption --query "Parameter.Value" --output text)
EMAIL_HOST=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name EMAIL_HOST --with-decryption --query "Parameter.Value" --output text)
EMAIL_USER=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name EMAIL_USER --with-decryption --query "Parameter.Value" --output text)
EMAIL_PASS=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name EMAIL_PASS --with-decryption --query "Parameter.Value" --output text)
PORT=$(/usr/local/bin/aws ssm get-parameter --region ap-southeast-2 --name PORT --with-decryption --query "Parameter.Value" --output text)

# Run the Docker image as a container
docker run -dit -p 80:80 \
  -e MONGO_URI="$MONGO_URI" \
  -e NODE_ENV="$NODE_ENV" \
  -e JWT_SECRET="$JWT_SECRET" \
  -e EMAIL_HOST="$EMAIL_HOST" \
  -e EMAIL_USER="$EMAIL_USER" \
  -e EMAIL_PASS="$EMAIL_PASS" \
  -e PORT="$PORT" \
  veapee/backend-kafe