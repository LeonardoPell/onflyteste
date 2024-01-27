#!/bin/bash

docker network create --driver bridge postgres-network
docker run -d --name postgres-container --network=postgres-network -e POSTGRES_DB=onflyTeste -e POSTGRES_USER=onflyTeste -e POSTGRES_PASSWORD=onflyTeste123 -p 5432:5432 postgres
#docker run --name teste-pgadmin --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=teste@teste.com.br" -e "PGADMIN_DEFAULT_PASSWORD=PgAdmin2024!" -d dpage/pgadmin4
npx prisma migrate dev --name init