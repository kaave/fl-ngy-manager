module API
  class Api < Grape::API
    prefix :api                 # add api prefix to path
    version 'v1', using: :path  # add api version to path
    format :json

    class RadioEntity < Grape::Entity
      expose :id, :name, :url, :memo
    end

    resource :radios do
      desc 'Return all radios.'
      get :all do
        present Radio.all, with: RadioEntity
      end

      route_param :id do
        desc 'Return a radio'
        get do
          present Radio.find(params[:id]), with: RadioEntity
        end
      end

      desc 'Create a radio'
      # paramsにはそのメソッドで必須なパラメータを書く
      params do
        requires :name, type: String, desc: 'name'
        requires :url, type: String, desc: 'url'
        requires :memo, type: String, desc: 'memo'
      end
      post do
        Radio.create(name: params[:name], url: params[:url], memo: params[:memo])
      end

      desc 'Start radio'
      params do
        requires :url, type: String, desc: 'Radio url'
      end
      post :start do
        if params[:url] =~ %r{\Ahttps?://[\w/:%#\$&\?\(\)~\.=\+\-]+\z}
          "Command: mplayer -playlist #{params[:url]}"
        else
          "Fail! url is invalid: #{params[:url]}"
        end
      end

      desc 'Return all radios.'
      get :stop do
        system('sudo killall mplayer')
        $CHILD_STATUS.inspect
      end

      # desc 'delete'
      # params do
      #   requires :id, type: Integer, desc: 'Article id'
      # end
      # delete ':id' do
      #   Article.find(params[:id]).destroy
      # end
    end
  end
end
