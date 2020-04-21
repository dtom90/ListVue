#!/bin/sh

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/.." || exit

echo
echo "Running end-to-end tests in TestCafé..."
echo
docker run -it -d --rm \
       --name listvue-testcafe \
       --network="listvue_default" \
       --entrypoint="" \
       testcafe/testcafe /bin/sh
docker cp tests/e2e listvue-testcafe:/tests
docker exec listvue-testcafe /bin/sh -c "HOSTNAME=front PORT=80 /opt/testcafe/docker/testcafe-docker.sh 'chromium'"
test_exit_code=$?
docker stop listvue-testcafe
if [ ${test_exit_code} != 0 ]; then exit ${test_exit_code}; fi
