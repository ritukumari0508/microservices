FROM node:alpine
WORKDIR /usr/src/app3
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm","run","start"]