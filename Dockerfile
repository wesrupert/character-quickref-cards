FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g vue-cli
COPY ./ .
RUN NODE_ENV=development npm install && \
  npx vue-cli-service build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
