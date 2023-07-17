# NestJS Sample

A NestJS RESTful APIs sample project, including:

* Restful APIs satisfies Richardson Maturity Model(Level 2)
* Custom Mongoose integration module instead of @nestjs/mongoose
* Passport/Jwt authentication with simple text secrets
* Fully testing codes with Jest, jest-mock-extended, ts-mockito, @golevelup/ts-jest etc.
* Github actions workflow for continuous testing, code coverage report, docker image building, etc.

## Docs

* [Getting Started](./docs/guide.md)
* [Connecting to MongoDB](./docs/mongo.md)
* [Protect your APIs with JWT Token](./docs/auth.md)
* [Dealing with model relations](./docs/model.md)
* [Externalizing the configuration](./docs/config.md)
* [Handling user registration](./docs/user.md)
* [Testing Nestjs applications](./docs/testing.md)

## Build

Install the dependencies.

```bash
$ npm install
```

Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
