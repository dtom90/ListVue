#!/bin/sh
set -e

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/../.." || exit

export HOST=localhost
export PORT=80

echo
echo "Running end-to-end tests in TestCafé..."
echo
docker run -it -d --rm \
       --name listvue-testcafe \
       --network=host \
       --entrypoint="" \
       testcafe/testcafe /bin/sh
docker cp tests/e2e listvue-testcafe:/tests
echo
docker exec -e HOST -e PORT listvue-testcafe /bin/sh -c "/opt/testcafe/docker/testcafe-docker.sh 'chromium'" \
 || export code=$? && docker stop listvue-testcafe && exit $code

docker stop listvue-testcafe
