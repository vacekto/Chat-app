FROM --platform=linux/amd64 node:20.9.0

ARG environment=development

WORKDIR /chatapp

COPY package.json .
COPY app/package.json app/package.json
COPY server/package.json server/package.json
COPY shared/package.json shared/package.json

RUN npm i

ENV NODE_ENV=${environment}

COPY bin bin

RUN bash -c "bin/buildApp.sh"

COPY . .

CMD ["npm","run","start"]