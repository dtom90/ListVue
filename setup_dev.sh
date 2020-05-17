#!/bin/sh

echo
echo "Initializing Database..."
echo
docker-compose exec api rails db:reset
echo
echo "Creating test user..."
echo
curl --location --request POST 'http://localhost:3000/api/users' \
     --header 'Content-Type: application/json' \
     --data '{"user":{"email":"test@example.com", "password":"testpassword"}}'
echo
echo
