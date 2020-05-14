# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY public public
COPY src src
RUN yarn run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY production/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
