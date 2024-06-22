FROM node:20-alpine

RUN apk update && apk add bash

WORKDIR /chatapp

COPY package.json .
COPY app app
COPY server server
COPY shared shared

RUN npm i

COPY . .

CMD ["npm","run","start"]