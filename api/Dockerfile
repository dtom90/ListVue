FROM ruby:2.7.0

ENV RAILS_ENV='production'
ENV RACK_ENV='production' 

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN bundle install --without development test

COPY . .

EXPOSE 3000

CMD export SECRET_KEY_BASE=$(rake secret) && rake db:reset && rails server -b 0.0.0.0