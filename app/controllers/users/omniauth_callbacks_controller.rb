class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    if request.env['omniauth.auth'][:info][:email] !~ /@#{ENV['VALID_MAIL_DOMAIN']}$/
      redirect_to root_path, flash: {
        error: "ユーザ[#{request.env['omniauth.auth'][:info][:name]}](#{request.env['omniauth.auth'][:info][:email]})は不正なメールアドレスなので追加できません。"
      }
      return
    end
    @user = User.find_for_google(request.env['omniauth.auth'])

    if @user.persisted?
      redirect_to root_path, flash: {
        notice: "ユーザ[#{@user.name}](#{@user.email})を多分追加しました。すでに同じメアドで登録があった場合は何もしてません。"
      }
    else
      redirect_to root_path, flash: {
        error: "ユーザ[#{request.env['omniauth.auth'][:info][:name]}](#{request.env['omniauth.auth'][:info][:email]})の追加に失敗しました。"
      }
    end
  end
end
