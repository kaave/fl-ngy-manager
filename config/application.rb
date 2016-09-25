require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FlNagoyaManager
  class Application < Rails::Application
    # Timezone
    config.time_zone = 'Tokyo'
    # locales
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :ja

    # generator
    config.generators do |g|
      # no create helper
      g.helper false
      # no create JavaScript
      g.javascripts false
      # no create assets
      g.assets false

      # test settings: use RSpec
      g.test_framework :rspec,
        # create fixture
        fixtures: true,
        # no create view spec
        view_specs: false,
        # no create helper spec
        helper_specs: false,
        # no create router spec
        routing_specs: false,
        # create controller spec
        controller_specs: true,
        # no create request spec
        request_specs: false
      # use factories
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
    end


    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # grape api settings
    config.paths.add(File.join('app', 'api'), glob: File.join('**', '*.rb'))
    config.autoload_paths += Dir[Rails.root.join('app', 'api', '*')]
  end
end
