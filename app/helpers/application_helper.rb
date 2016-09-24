module ApplicationHelper
  def assets_path(path)
    if Rails.env.development?
      dir_path = File.extname(path) == '.css' ? 'stylesheets' : 'javascripts'
      return "http://localhost:4000/#{dir_path}/#{path}"
    end

    manifest = Rails.application.config.assets_manifest
    path = manifest[path] if manifest && manifest[path].present?
    "/dist/#{path}"
  end

end
