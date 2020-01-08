# Setup and build
FROM node:13.5.0-alpine

WORKDIR /usr/app/
COPY . ./
RUN npm install

EXPOSE 5000
CMD npm run migrate && npm start
