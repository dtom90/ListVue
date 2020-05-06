FROM ruby:2.6.6

ENV RAILS_ENV='production'
ENV RACK_ENV='production' 

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN bundle install --without development test

COPY . .

EXPOSE 3000

CMD export SECRET_KEY_BASE=$(rake secret) && DISABLE_DATABASE_ENVIRONMENT_CHECK=1 rake db:reset && rails server -b 0.0.0.0