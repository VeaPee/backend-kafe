FROM node:21.6.1-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent

COPY . .

RUN chown -R node /usr/src/app
USER node

RUN npm run test

EXPOSE 5000

CMD ["npm", "start"]
