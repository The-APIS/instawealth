FROM node:14-alpine

RUN apk update -qq \
  && apk add --no-cache git \
  && apk add python \
  && apk add --update alpine-sdk \
  && apk add --no-cache bash

RUN mkdir /app

ADD . ./app

WORKDIR /app

RUN npm i
RUN cd server && npm i
RUN npm run build


CMD npm --prefix=server start