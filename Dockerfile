FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG RIOT_API_KEY
ENV RIOT_API_KEY=$RIOT_API_KEY

RUN npm run build

EXPOSE 4003
ENV NODE_ENV=production

CMD ["npm", "start"]