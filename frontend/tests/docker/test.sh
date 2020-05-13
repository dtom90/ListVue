#!/bin/sh
set -e

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/../.." || exit

echo
echo "Building test container..."
echo
docker build \
       -f Dockerfile \
       -t listvue-test \
       .
echo
echo "Running Package Audit, Lint, and Unit Tests..."
echo
docker run -i --rm \
       --name listvue-test \
       listvue-test \
       sh -c 'yarn run test'
