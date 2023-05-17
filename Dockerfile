# Entwicklungs-Image
FROM node:16 AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .


CMD ["npm", "run", "dev"]

# Produktions-Image
FROM development as build

RUN npm run build

FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]
