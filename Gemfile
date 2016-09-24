source 'https://rubygems.org'
ruby '2.3.1'

# base
gem 'rails', '~> 5.0.0'
# web server (for websocket)
gem 'puma', '~> 3.0'
# compressor
gem 'uglifier', '>= 1.3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# encript
gem 'bcrypt', '~> 3.1.7'
# etc important package
gem 'turbolinks', '~> 5'

# react for rails
gem 'react-rails'

# use a ruby hash as a readonly datasource for an ActiveRecord-like model
gem 'active_hash'

# add decorator
gem 'activemodel-serializers-xml', git: 'https://github.com/rails/activemodel-serializers-xml'
gem 'draper', github: 'audionerd/draper', branch: 'rails5'

# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# load .env from project root
gem 'dotenv-rails'

# add initial data
gem 'seed-fu', '~> 2.3'

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'

  # run rails with npm script
  gem 'foreman'

  # speed up
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # alert n+1 problem
  gem 'bullet'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri

  # change irb to pry
  gem 'pry-rails'
  gem 'pry-doc'
  gem 'pry-byebug'
  gem 'pry-stack_explorer'

  # test runner
  gem 'rspec-rails'
  # speed up
  gem 'spring-commands-rspec'

  # create dummy data
  gem 'factory_girl_rails'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'

  # watch and livereload
  gem 'guard-livereload', require: false

  # use VSCode debugger
  gem 'ruby-debug-ide'
  gem 'debase'
end

group :test do
  # watch code on test
  gem 'guard-rspec', require: false

  # create dummy user
  gem 'faker'
  gem 'faker-japanese'

  # browser manager
  gem 'selenium-webdriver'
  gem 'capybara'

  # remove dummy data
  gem 'database_cleaner'

  # open web browser
  gem 'launchy'
end

# for deployment
group :deployment do
  gem 'capistrano-rails'
  gem 'capistrano-rbenv'
  gem 'capistrano-bundler'
end

group :production do
  # PostgreSQL
  gem 'pg'
  # Use Redis adapter to run Action Cable in production
  gem 'redis', '~> 3.0'
  # use Redis on cookie and sessions
  gem 'redis-rails'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
