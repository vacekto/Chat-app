FROM --platform=linux/amd64 node:20.9.0

ARG environment=development

ENV NODE_ENV=${environment}

WORKDIR /chatapp

COPY package.json .
COPY app/package.json app/package.json
COPY server/package.json server/package.json
COPY shared/package.json shared/package.json
COPY bin bin

# RUN npm i
COPY node_modules node_modules
COPY . .

RUN  bin/buildApp.sh

CMD ["npm", "run", "start"]