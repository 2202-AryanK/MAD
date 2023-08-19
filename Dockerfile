FROM node:16.20.1

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm","start"]

EXPOSE 5566