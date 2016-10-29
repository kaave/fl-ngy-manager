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
      expose :devices
    end

    resource :users do
      desc 'Return all users.'
      get do
        present User.all, with: UserEntity
      end

      route_param :id do
        desc 'Update user'
        params do
          requires :id, type: Integer, desc: 'id'
          requires :name, type: String, desc: 'name'
          requires :email, type: String, desc: 'email'
          optional :devices, type: Array[Integer], desc: 'devices'
        end
        put do
          user = User.find(params[:id])
          pre_devices = user.devices.map(&:id)
          user.update({
            name: params[:name],
            email: params[:email],
            # devices: params[:devices] ||= []
          })

          # TODO: 微妙な書き方
          # クエリ組み立てるのはすぐ思いついたけどこれまた微妙だしな〜
          [].concat(pre_devices).concat(params[:devices] || []).each do |device_id|
            if !params[:devices] || !params[:devices].include?(device_id)
              Device.find(device_id).update({user_id: nil})
            elsif params[:devices] && params[:devices].include?(device_id)
              Device.find(device_id).update({user_id: params[:id]})
            end
          end

          present User.find(params[:id]), with: UserEntity
        end
      end
    end

    class DeviceEntity < Grape::Entity
      expose :id, :name, :key, :type_code, :source, :user_id
    end

    resource :devices do
      desc 'Return all devices.'
      get :all do
        present Device.all, with: DeviceEntity
      end

      desc 'Create a device'
      params do
        requires :name, type: String, desc: 'name'
        requires :type_code, type: Integer, desc: 'type_code'
        requires :key, type: String, desc: 'key'
        requires :source, type: String, desc: 'source'
      end
      post do
        Device.create(name: params[:name], type_code: params[:type_code], key: params[:key], source: params[:source])
      end

      desc 'Return all users.'
      params do
        requires :src, type: String, desc: 'Full src'
      end
      get :read do
        begin
          ActionCable.server.broadcast('reader_read', mode: 'DeviceRead', src: params[:src], datetime: Time.now)
          "Success! src:[#{params[:src]}] datetime: [#{Time.now}]"
        rescue => exception
          "Error! src:[#{params[:src]}] datetime: [#{Time.now}] error: [#{exception}]"
        end
      end
    end
  end
end
