# List Vue
[![Build Status](https://travis-ci.org/dtom90/List-Vue.svg?branch=master)](https://travis-ci.org/dtom90/List-Vue)
[![CircleCI](https://circleci.com/gh/dtom90/ToDo-Vue.svg?style=svg)](https://circleci.com/gh/dtom90/ToDo-Vue)

List management application

- Front-end Framework: [Vue.js](https://vuejs.org/)
  - State management: [Vuex](https://vuex.vuejs.org/)
  - UI Framework: [Vuetify](https://vuetifyjs.com/)
- Testing:
  - Unit: [Jest](https://jestjs.io/), [Vue Test Utils](https://vue-test-utils.vuejs.org/)
  - End-to-end: [Testcafé](https://devexpress.github.io/testcafe/)
- Continuous Integration:
  - [CircleCI](https://circleci.com/)
  - [Travis CI](https://travis-ci.com/)

## Setup
```
yarn install
```
#### Install in Docker for development:
```
./docker/install.sh
```

## Development
#### Compile and hot-reload for development:
```
yarn run dev
```
#### Deploy container for development:
```
./docker/dev.sh
```

## Test
#### Lint and fix source files
```
yarn run lint
```
#### Run unit tests with jest
```
yarn run test:unit
```
#### Run end-to-end tests with [TestCafé](https://testcafe.devexpress.com/) (with dev or prod server)
```
yarn run test:e2e:dev
yarn run test:e2e:prod
```
#### Run all tests (lint, unit tests, end-to-end tests)
```
yarn run test
```
#### Run all tests in Docker containers
```
./docker/test.sh
```

## Production
#### Compile and minify for production
```
yarn run build
```
#### Serve production files
```
yarn run serve:prod
```
#### Build Docker image and deploy container for production:
```
./docker/prod.sh
```
