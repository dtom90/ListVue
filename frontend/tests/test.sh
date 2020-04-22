#!/bin/sh

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/.." || exit

echo
echo "Building test container..."
echo
docker build \
       -f Dockerfile \
       -t listvue-test \
       . && \
echo && echo "Running Package Audit, Lint, and Unit Tests..." && echo && \
docker run -i --rm \
       --name listvue-test \
       listvue-test \
       sh -c 'yarn run test'
test_exit_code=$?
if [ ${test_exit_code} != 0 ]; then exit ${test_exit_code}; fi
