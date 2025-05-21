FROM node:lts AS build
ARG REACT_APP_ARCH_REPO_PATH=arch-repo/x86_64/repo.db.tar.gz
RUN mkdir /out
COPY ./package.json ./package.json
COPY ./src ./src
COPY ./public ./public
RUN npm install && npm run build && cp -a build/. /out
RUN mkdir -p "$(dirname /repo/${REACT_APP_ARCH_REPO_PATH})" && tar -czf /repo/${REACT_APP_ARCH_REPO_PATH} --files-from /dev/null

FROM nginxinc/nginx-unprivileged
ENV ARCH_REPO_BASE=arch-repo
COPY --chown=nginx:nginx --chmod=744 ./nginx.default.conf /etc/nginx/templates/default.conf.template
COPY --from=build --chown=root:root --chmod=555 /out /usr/share/nginx/html/
COPY --from=build --chown=root:root --chmod=555 /repo /usr/share/nginx/repo/
