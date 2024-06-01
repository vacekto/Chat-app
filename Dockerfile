FROM --platform=linux/amd64 node:20.9.0

WORKDIR /chatapp

COPY package.json .
COPY app app
COPY server server
COPY shared shared

RUN npm i

COPY . .

CMD ["npm","run","start"]