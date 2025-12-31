## Description

Api Gateway with [Nest] Microservices integration
The project aims to integrate [Nest] Microservices with Api Gateway

.env.development.local has not been pushed to GitHub Repository (.gitignore)

Api Gateway runs on port localhost:3000
Api Microservice runs on port localhost:3001
As requested, the internal protocol for communication between gateway and microservice is TCP

Api Gateway is pushed to main GitHub branch
Api Service is pushed to master GitHub branch
Branches have not been merged

Swagger Api Gateway Documentation in available at localhost:3000/api
Routes [Get] /users and [Post] /users are protected with JWT authorization token
Route [Post] /auth/login returns a JWT Bearer token


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

