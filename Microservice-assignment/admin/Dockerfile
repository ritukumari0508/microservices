FROM node:alpine
WORKDIR /usr/src/app5
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm","run","start"]