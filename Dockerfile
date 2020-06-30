# base image
FROM node:13.7.0 as build

COPY . /app

# set working directory
WORKDIR /app

# install and cache app dependencies
RUN npm install && npm run build

CMD ["npm","run","docker"]