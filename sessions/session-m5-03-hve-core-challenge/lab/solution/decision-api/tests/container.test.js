const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

describe('container definition', () => {
  it('tests the source before building a production-only runtime image', () => {
    const dockerfile = fs.readFileSync(path.join(projectRoot, 'Dockerfile'), 'utf8');

    expect(dockerfile).toMatch(
      /^FROM mcr\.microsoft\.com\/azurelinux\/base\/nodejs:24\.21 AS test$/m
    );
    expect(dockerfile).toContain('RUN npm ci --ignore-scripts');
    expect(dockerfile).toContain('COPY Dockerfile .dockerignore ./');
    expect(dockerfile).toMatch(/^RUN npm test$/m);
    expect(dockerfile).toMatch(
      /^FROM mcr\.microsoft\.com\/azurelinux\/base\/nodejs:24\.21 AS dependencies$/m
    );
    expect(dockerfile).toContain('RUN npm ci --omit=dev --ignore-scripts');
    expect(dockerfile).toMatch(
      /^FROM mcr\.microsoft\.com\/azurelinux\/base\/nodejs:24\.21 AS runtime$/m
    );
    expect(dockerfile).toContain('COPY --from=test --chown=10001:10001 /app/src ./src');
    expect(dockerfile).toContain(
      'LABEL com.azure.containerizationassist.createdby="containerization-assist"'
    );
    expect(dockerfile).toMatch(/^USER 10001:10001$/m);
    expect(dockerfile).toMatch(/^HEALTHCHECK /m);
    expect(dockerfile).toContain('http://127.0.0.1:3000/health');
    expect(dockerfile).toContain('ENTRYPOINT ["node", "src/index.js"]');
  });

  it('keeps development inputs out of the image context', () => {
    const dockerignore = fs.readFileSync(path.join(projectRoot, '.dockerignore'), 'utf8');
    const ignoredPaths = new Set(dockerignore.split(/\r?\n/).filter(Boolean));

    expect(ignoredPaths.has('.git')).toBe(true);
    expect(ignoredPaths.has('.github')).toBe(true);
    expect(ignoredPaths.has('node_modules')).toBe(true);
    expect(ignoredPaths.has('tests')).toBe(false);
  });
});