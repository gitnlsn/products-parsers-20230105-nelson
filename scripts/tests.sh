#!/bin/bash

setup() {
    yarn
    docker compose up -d
    sleep 5
    npx prisma migrate dev
}

cleanup() {
    docker compose down
}

test() {
    npx jest src/integration-tests --runInBand
}

trap cleanup SIGINT
setup
test
cleanup
