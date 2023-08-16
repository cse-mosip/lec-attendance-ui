FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm i --force
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine-slim

# Update nginx user/group in alpine
ENV ENABLE_PERMISSIONS=TRUE
ENV DEBUG_PERMISSIONS=TRUE
ENV USER_NGINX=10015
ENV GROUP_NGINX=10015

COPY --from=builder /app/build /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER 10015
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]