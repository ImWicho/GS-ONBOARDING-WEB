FROM node:10-alpine AS BUILDER

WORKDIR /usr/src/app
COPY package.json ./

ARG API_URL
ARG OCR_API_URL

ENV API_URL=$API_URL
ENV OCR_API_URL=$OCR_API_URL

RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/configfile.template

ENV PORT 8080

ENV HOST 0.0.0.0

RUN sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

COPY --from=BUILDER /usr/src/app/dist/gs-onboarding-web /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
