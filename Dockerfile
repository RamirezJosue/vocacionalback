FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DB_CNN="mongodb+srv://visita:t7CNJsBhk3sXSAf3@cluster0.8pdxp.mongodb.net/vocacionaldb?retryWrites=true&w=majority"
ENV JWT_SECRET=asdjkfnsdkjfnsdkfn@fjfesbesifbes


CMD [ "npm", "start" ]