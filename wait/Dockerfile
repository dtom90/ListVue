FROM node:lts-alpine

RUN apk add --no-cache bash

COPY wait-for-it.sh .

ENTRYPOINT ["./wait-for-it.sh"]