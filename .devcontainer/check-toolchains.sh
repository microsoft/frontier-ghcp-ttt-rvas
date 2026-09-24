#!/usr/bin/env bash
set -euo pipefail

printf 'Node.js: '
node --version

printf 'Java: '
java -version 2>&1 | head -n 1

printf '.NET SDK: '
dotnet --version

printf 'Python: '
python --version

printf 'Training toolchains are ready.\n'
