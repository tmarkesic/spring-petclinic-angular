FROM node:16.3-alpine as build

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.6-alpine

COPY --from=build /build/dist/. /usr/share/nginx/html

EXPOSE 80
