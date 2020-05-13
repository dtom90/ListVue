#!/bin/sh
set -e

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/../.." || exit

echo "Initializing Database..."
echo
docker-compose exec api rake db:setup
echo
echo "Creating test user..."
docker run -it --rm \
       --network="listvue_default" appropriate/curl \
       --location --request POST 'http://api:3000/api/users' \
       --header 'Content-Type: application/json' \
       --data '{"user":{"email":"test@example.com", "password":"testpassword"}}'
echo
echo "Running end-to-end tests in TestCafé..."
echo
docker run -it -d --rm \
       --name listvue-testcafe \
       --network="listvue_default" \
       --entrypoint="" \
       testcafe/testcafe /bin/sh
docker cp tests/e2e listvue-testcafe:/tests

docker exec listvue-testcafe /bin/sh -c "HOSTNAME=front PORT=80 /opt/testcafe/docker/testcafe-docker.sh 'chromium'"\
 || export code=$? && docker stop listvue-testcafe && exit $code
docker stop listvue-testcafe
