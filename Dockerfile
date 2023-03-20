FROM node:18.13.0-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:mainline
COPY --from=build /app/dist var/www
COPY nginx.conf etc/nginx/nginx.conf

EXPOSE 8000
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
