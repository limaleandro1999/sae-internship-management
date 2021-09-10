# 1 - Build environment
FROM node:14 as builder

ARG REACT_APP_SERVER_URL=http://locahost:4000

# ENV NODE_ENV build
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL

USER node
WORKDIR /home/node

COPY . /home/node

RUN yarn install --frozen-lockfile

CMD [ "yarn", "start" ]

# RUN yarn install --frozen-lockfile && yarn build

# # 2 - Production environment
# FROM nginx:1.16.0-alpine

# COPY --from=builder /home/node/build/ /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
