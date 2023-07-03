FROM node:18

WORKDIR /chatapp

COPY package.json ./

RUN npm install

COPY . .

EXPOSE '5173'

EXPOSE '3000'

CMD ["npm", "run", "dev"]

