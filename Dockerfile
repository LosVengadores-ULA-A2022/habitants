FROM node:alpine as base

RUN apk add bash

WORKDIR /app

COPY package.json yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN chmod 775 wait-for-it.sh