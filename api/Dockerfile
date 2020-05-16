FROM ruby:2.6.6

ARG RAILS_ENV=development
ENV RAILS_ENV $RAILS_ENV

WORKDIR /app

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN gem install bundler:2.1.2
RUN bundle install

COPY . .

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["rails", "server", "-b", "0.0.0.0"]