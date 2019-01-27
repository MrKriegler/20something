FROM node:8.11.4

RUN mkdir -p /usr/src/app/api

WORKDIR /usr/src/app/api

COPY package.json ./
RUN npm install
COPY ./ ./

EXPOSE 3001

