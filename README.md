# ListVue
[![CircleCI](https://circleci.com/gh/dtom90/ListVue.svg?style=svg)](https://circleci.com/gh/dtom90/ListVue)

List management application

#### Tech
- Front-end Framework: [Vue.js](https://vuejs.org/)
  - State Management: [Vuex](https://vuex.vuejs.org/)
  - UI Framework: [Vuetify](https://vuetifyjs.com/)
  - Drag-and-drop: [Vue.Draggable](https://sortablejs.github.io/Vue.Draggable/)
- Back-end Framework: [Ruby on Rails](https://rubyonrails.org/)
  - Database: [Postgres](https://www.postgresql.org/)
- Testing:
  - Package Audit: [yarn audit](https://yarnpkg.com/lang/en/docs/cli/audit/)
  - Lint: [ESLint](https://eslint.org/)
  - Unit: [Jest](https://jestjs.io/), [Vue Test Utils](https://vue-test-utils.vuejs.org/)
  - End-to-end: [Testcafé](https://devexpress.github.io/testcafe/)
- Continuous Integration:
  - Container: [Docker](https://www.docker.com/)
  - Test: [CircleCI](https://circleci.com/)

## Development
#### Run frontend, api, and db in development
```bash
docker-compose up --build
```

## Test

#### Run basic frontend tests
```bash
./frontend/tests/run.sh
```

#### Build deployment for end-to-end testing
```bash
docker-compose -f docker-compose-test.yml up --build
```

#### Run end-to-end tests with [TestCafé](https://testcafe.devexpress.com/)
```bash
./frontend/tests/e2e/run.sh
```

## Production

#### Deploy for production
```bash
docker-compose -f docker-compose-production.yml up --build
```
