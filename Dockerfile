FROM node:14.18.2-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn global add serve
RUN yarn --silent
RUN ls -a
RUN yarn build
CMD ["serve", "-s", "build", "-l", "3000"]