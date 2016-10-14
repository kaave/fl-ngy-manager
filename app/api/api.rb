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
        requires :id, type: Integer, desc: 'id'
      end
      post :start do
        radio = Radio.find(params[:id])
        if radio
          "Command: mplayer -playlist #{radio.url}"
        else
          "Fail! id is invalid: #{params[:id]}"
        end
      end

      desc 'Return all radios.'
      get :stop do
        system('sudo killall mplayer')
        $CHILD_STATUS.inspect
      end

      route_param :id do
        desc 'Return a radio'
        get do
          present Radio.find(params[:id]), with: RadioEntity
        end
      end

      # desc 'delete'
      # params do
      #   requires :id, type: Integer, desc: 'Article id'
      # end
      # delete ':id' do
      #   Article.find(params[:id]).destroy
      # end
    end

    class UserEntity < Grape::Entity
      expose :id, :name, :email
    end

    resource :users do
      desc 'Return all users.'
      get :all do
        present User.all, with: UserEntity
      end
    end

    class DeviceEntity < Grape::Entity
      expose :id, :name, :key, :type_code, :source
    end

    resource :devices do
      desc 'Return all users.'
      get :all do
        present Device.all, with: DeviceEntity
      end

      desc 'Return all users.'
      params do
        requires :src, type: String, desc: 'Full src'
      end
      get :read do
        begin
          ActionCable.server.broadcast('reader_read', mode: 'CardLoad', src: params[:src], datetime: Time.now)
          "Success! src:[#{params[:src]}] datetime: [#{Time.now}]"
        rescue => exception
          "Error! src:[#{params[:src]}] datetime: [#{Time.now}] error: [#{exception}]"
        end
      end
    end
  end
end
