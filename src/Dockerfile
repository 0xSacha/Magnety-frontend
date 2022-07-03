FROM node:18-alpine

WORKDIR /src

COPY ../package.json .

RUN yarn dev

EXPOSE 3000

CMD ["yarn", "dev"]
