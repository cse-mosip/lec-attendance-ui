FROM node:alpine as build
WORKDIR /lec-attendance-ui
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /lec-attendance-ui/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]