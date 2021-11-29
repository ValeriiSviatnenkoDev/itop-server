FROM node:16.13.0
WORKDIR /api/
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]