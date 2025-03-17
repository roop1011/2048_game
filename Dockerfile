FROM node:16.20.0-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm config set engine-strict false && \
    npm ci --legacy-peer-deps --no-audit

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
