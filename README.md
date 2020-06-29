[![CodeFactor](https://www.codefactor.io/repository/github/malkaviano/keycash-backend-challenge-rafaelk/badge)](https://www.codefactor.io/repository/github/malkaviano/keycash-backend-challenge-rafaelk)

# keycash-backend-challenge-rafaelk
Keycash Programming Test

Environment:
- HOST
- PORT
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME

How to get the docker postgres working locally, you don't need it if you have a postgres.

docker pull postgres:11

docker run --name keycash-postgres -p 5432:5432 -e POSTGRES_DB=keycash -e POSTGRES_USER=keycash -e POSTGRESS_PASSWORD=keycash -d postgres:11

Executando o servidor

- Global install: npm i -g typescript, ts-node, typeorm, @nestjs/cli

- npm install

- npm build

- npm run migration:run

- npm run start
