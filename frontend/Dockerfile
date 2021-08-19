FROM node:14 as builder

ENV NODE_ENV build
ENV REACT_APP_SERVER_URL http://localhost:4000

USER node
WORKDIR /home/node

COPY . /home/node

RUN yarn install --frozen-lockfile && yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=builder /home/node/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:14

# ENV NODE_ENV production

# USER node
# WORKDIR /home/node

# COPY --from=builder /home/node/package*.json /home/node/
# COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
# COPY --from=builder /home/node/build/ /home/node/build/

# CMD ["yarn", "start:prod"]