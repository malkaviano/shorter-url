# url-shortener
Programming Test

Environment:
- HOST
- PORT
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME

How to get the docker postgres working locally, you don't need it if you have a postgres.

Change defaults using environment above to your DB credentials.

docker pull postgres:11

docker run --name local-postgres -p 5432:5432 -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e POSTGRESS_PASSWORD=default -d postgres:11

Running locally

- Global install: sudo npm i -g typescript, ts-node, typeorm, @nestjs/cli

- npm install

- npm build

- npm run migration:run

- npm run start
