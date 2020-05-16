# ListVue API

Backend API for the ListVue app

* [Ruby version](.ruby-version)

* [Dependencies](Gemfile)

* Configuration
  - set `SECRET_KEY_BASE` to something, eg.g. `SECRET_KEY_BASE=$(rake secret)`
  - set `POSTGRES_PASSWORD` to the password of your postgres database
  - see [`config/database.yml`](config/database.yml) for additional database settings

* Database creation: `rails db:create`

* Database initialization: `rails db:migrate`

* How to run the test suite: `rails test`
