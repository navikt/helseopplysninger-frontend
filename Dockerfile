FROM navikt/node-express:14-alpine

ARG APPNAME=none
WORKDIR /app
COPY dist/apps/${APPNAME} dist
COPY apps/${APPNAME}/server.js ./
EXPOSE 2022
