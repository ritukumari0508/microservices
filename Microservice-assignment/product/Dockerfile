FROM node:alpine
WORKDIR /usr/src/app2
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm","run","start"]