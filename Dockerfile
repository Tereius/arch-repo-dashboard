FROM node:lts-alpine
ENV REACT_APP_ARCH_REPO_PATH=repo.db.tar.gz
RUN mkdir /out
COPY ./ ./
RUN npm run build
CMD ["cp","-a","build/.","/out"]
