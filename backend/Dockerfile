FROM node:14 as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN yarn install --frozen-lockfile && yarn build

FROM node:14

# ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package.json /home/node/
COPY --from=builder /home/node/yarn.lock /home/node/
COPY --from=builder /home/node/templates/ /home/node/templates/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["yarn", "start:prod"]