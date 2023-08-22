FROM node:18-alpine

EXPOSE 5000

WORKDIR /apps

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]