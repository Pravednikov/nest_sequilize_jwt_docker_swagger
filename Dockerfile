FROM node:18.15
WORKDIR /app
COPY . .
RUN npm ci
