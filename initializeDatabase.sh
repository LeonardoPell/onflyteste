#!/bin/bash

docker network create --driver bridge postgres-network
docker run -d --name postgres-container --network=postgres-network -e POSTGRES_DB=onflyTeste -e POSTGRES_USER=onflyTeste -e POSTGRES_PASSWORD=onflyTeste123 -p 5432:5432 postgres