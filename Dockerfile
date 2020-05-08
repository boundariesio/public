FROM node:14 AS builder

WORKDIR /app

RUN npm install -g gatsby-cli

COPY .baseline/package.json .baseline/package-lock.json ./

RUN npm install

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8001

FROM builder as production

RUN npm run build

RUN npm start
