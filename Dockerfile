# estágio de compilação
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM build-stage as build-app
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
RUN apk add --no-cache bash
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-app /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]