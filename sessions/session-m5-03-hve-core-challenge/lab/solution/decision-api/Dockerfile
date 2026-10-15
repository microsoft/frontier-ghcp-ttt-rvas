FROM mcr.microsoft.com/azurelinux/base/nodejs:24.21 AS test

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY Dockerfile .dockerignore ./
COPY src ./src
COPY tests ./tests

RUN npm test

FROM mcr.microsoft.com/azurelinux/base/nodejs:24.21 AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

FROM mcr.microsoft.com/azurelinux/base/nodejs:24.21 AS runtime

ENV NODE_ENV=production \
    PORT=3000

LABEL com.azure.containerizationassist.createdby="containerization-assist"

WORKDIR /app

COPY --from=dependencies --chown=10001:10001 /app/node_modules ./node_modules
COPY --chown=10001:10001 package.json ./
COPY --from=test --chown=10001:10001 /app/src ./src

USER 10001:10001

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then((response) => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1));"

ENTRYPOINT ["node", "src/index.js"]