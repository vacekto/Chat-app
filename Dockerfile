FROM node:20.9.0

WORKDIR /chatapp

COPY package.json .
COPY app/package.json app/package.json
COPY server/package.json server/package.json
COPY shared/package.json shared/package.json
COPY bin bin
COPY bin/start.sh bin/start.sh

RUN npm i

COPY . .

CMD ["npm", "run", "start"]