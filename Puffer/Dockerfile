FROM node:24-alpine@sha256:5fa278c599dbba0c8f873d8717d50ecbb57c5ae6a53b7ab240c25135e0b65995

# Create app directory
WORKDIR /usr/src/app

RUN npm install --global decentraland@next

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "npm", "start", "--", "--ci" ]