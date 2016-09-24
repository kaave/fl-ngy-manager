require 'rails_helper'

RSpec.describe 'StaticPages', type: :request do
  subject { page }

  describe 'Index page' do
    before { visit root_path }

    it { should have_title('Rails with webpack') }
    it { should have_content('Hello, rails with webpack') }
  end
end
