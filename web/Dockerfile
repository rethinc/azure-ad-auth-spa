FROM node:17.6.0 AS builder

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
COPY . .
RUN npm run verify
RUN npm run build

FROM nginx:1.21.4-alpine
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/write-env-to.sh /write-env-to.sh
RUN chmod u+x /write-env-to.sh
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod u+x /entrypoint.sh

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT "/entrypoint.sh"