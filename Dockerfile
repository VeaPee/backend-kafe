FROM node:lts-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5000
RUN chown -R node /usr/src/app
USER node
COPY k8s k8s
CMD ["npm", "start"]
