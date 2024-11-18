FROM node
COPY package.json .
COPY .npmrc .
RUN npm install
COPY app.js .
COPY index.html .
COPY styles.css .
COPY client.js .
EXPOSE 8000
CMD [ "npm", "start" ]
