#!/bin/sh
set -e

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/.." || exit

echo
echo "Initializing Database..."
echo
docker-compose --project-name listvue exec api rake db:setup
echo
echo "Creating test user..."
docker run -it --rm \
       --network="listvue_default" appropriate/curl \
       --location --request POST 'http://api:3000/api/users' \
       --header 'Content-Type: application/json' \
       --data '{"user":{"email":"test@example.com", "password":"testpassword"}}'
echo