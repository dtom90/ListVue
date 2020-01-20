#!/usr/bin/env bash

IMAGE_NAME=node:10.15.1-alpine

CMD="$@"
if [[ -z "$CMD" ]]; then CMD="yarn run dev"; fi

THIS_DIR=$(dirname "$0")
cd "${THIS_DIR}/.."

docker run -i --rm \
       -p 8080:8080 \
       -v `pwd`:/app \
       -w /app \
       --name listvue-dev \
       ${IMAGE_NAME} \
       ${CMD}
