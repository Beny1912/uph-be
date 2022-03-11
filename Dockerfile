FROM node:17.3.0-alpine
WORKDIR /app
ADD . .
ENV NODE_ENV=PRO
RUN npm i -g typescript
RUN npm i
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/index.js" ]