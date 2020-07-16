# url-shortener
Programming Test

[![CodeFactor](https://www.codefactor.io/repository/github/malkaviano/shorter-url/badge)](https://www.codefactor.io/repository/github/malkaviano/shorter-url)

Environment:
- HOST
- PORT
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME

How to get the docker postgres working locally, you don't need it if you have a postgres.

- docker pull postgres:11

Using defaults, if you change them remember to pass them to docker server.

- docker run --name local-postgres -p 5432:5432 -e POSTGRES_DB=default -e POSTGRES_USER=postgres -e POSTGRESS_PASSWORD=default -d postgres:11

Running locally

- Global install: sudo npm i -g typescript, ts-node, typeorm, @nestjs/cli, pm2@latest

- npm install

- npm build

- npm run migration:run

- npm run start

Now export to your terminal the variables you changed the defaults, if needed.

Running with Docker

Build the container

- docker build --tag shorter .

Running the container built, change HOST IP to the IP of the DB. You can figure it out using docker network inspect bridge

- docker run --rm --name shorter -p 8500:8500 -e 'HOST=172.17.0.2' -d shorter

Connect to the port 8500 (default).