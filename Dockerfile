FROM node:14

WORKDIR /usr/src/app

COPY . ./
RUN npm install
RUN npm run generate

CMD [ "npm", "run", "start" ]