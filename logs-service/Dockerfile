#use node 20 image
FROM node:20

# set working directory inside container
WORKDIR /app

# copy package files
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest of the app
COPY . .

CMD ["npm","start"]

