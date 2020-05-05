#!/bin/sh
set -e

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/.." || exit

echo
echo "Creating test user..."
docker run -it --rm \
     --network="listvue_default" appropriate/curl \
     -4 --retry 10 --retry-delay 1 --retry-connrefused \
     --location --request POST 'http://api:3000/api/users' \
     --header 'Content-Type: application/json' \
     --data-raw '{"user":{"email":"test@example.com", "password":"testpassword"}}'
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
docker stop listvue-testcafe
