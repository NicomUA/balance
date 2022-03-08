## Installation

```bash
$ yarn
```

## Running the app

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

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
