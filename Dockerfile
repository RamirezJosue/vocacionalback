FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DB_CNN="mongodb+srv://visita:t7CNJsBhk3sXSAf3@cluster0.8pdxp.mongodb.net/vocacionaldb?retryWrites=true&w=majority"
ENV JWT_SECRET=asdjkfnsdkjfnsdkfn@fjfesbesifbes

# Nodemailer
ENV HOST_NODEMAILER=smtp.office365.com
ENV PORT_NODEMAILER=587
ENV USER=noreply@adra.org.pe
ENV PASS=Yam58515
ENV SENDER=noreply@adra.org.pe

# Cloudinary
ENV CLOUD_NAME=dd9vj0jjh
ENV API_KEY=543636542967156
ENV API_SECRET=CrF8v4HtlSCvAtAsTW2w2qt6IL4

CMD [ "sudo node", "index.js" ]