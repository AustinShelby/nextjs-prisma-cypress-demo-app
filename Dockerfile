FROM cypress/base:16

RUN mkdir nextjs-cypress-demo

COPY package.json yarn.lock /nextjs-cypress-demo/

WORKDIR nextjs-cypress-demo

RUN yarn install