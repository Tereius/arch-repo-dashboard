FROM node:lts-alpine AS build
ARG REACT_APP_ARCH_REPO_PATH=repo.db.tar.gz
RUN mkdir /out
COPY ./package.json ./package.json
COPY ./src ./src
COPY ./public ./public
RUN npm install && npm run build && cp -a build/. /out

FROM nginxinc/nginx-unprivileged
COPY --chown=nginx:nginx --chmod=500 ./nginx.default.conf /etc/nginx/templates/default.conf.template
COPY --from=build --chown=nginx:nginx --chmod=500 /out /usr/share/nginx/html/
