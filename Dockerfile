FROM --platform=linux/amd64 node:20.9.0

WORKDIR /chatapp

COPY package.json .
COPY app app
COPY server server
COPY shared shared

RUN npm i

COPY . .

COPY /home/runner/work/chat-app/chat-app/server/dist /chatapp/server/dist

RUN bash -c "(cd server && ls)"

RUN bash -c "echo $(pwd)"

# CMD ["npm","run","start"]