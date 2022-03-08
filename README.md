## Installation

```bash
$ yarn
```

## Running the app

create .env file like this
```
PORT=3000
ENV=development
ORIGIN_URL=http://localhost:3000/

#LOG_LEVEL=error

# local
DB_TYPE=postgres
DB_HOST=localhost
DB_NAME=balance
DB_USER=balance
DB_PASSWORD=balance

# RUN_MIGRATION=true

# get key on https://openexchangerates.org/
EXCHANGE_KEY=<your key>
EXCHANGE_URL=https://openexchangerates.org/api/latest.json
```

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Initial env setup

- Start all docker services by running:

  ```bash
  $ docker-compose up
  ```

- Seed the database:

  ```bash
  $ yarn db:init
  ```

## Run env

```bash
$ docker-compose up
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```
