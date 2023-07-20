FROM node:18

WORKDIR /chatapp

RUN npm install -g npm

COPY package.json ./
COPY app/package.json ./app/package.json
COPY server/package.json ./server/package.json
COPY shared/package.json ./shared/package.json


RUN npm i

COPY . .

EXPOSE 5173

EXPOSE 3000

CMD ["npm", "run", "dev"]

