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

      route_param :id do
        desc 'Return a radio'
        get do
          present Radio.find(params[:id]), with: RadioEntity
        end
      end

      # desc 'Create a Article'
      # # paramsにはそのメソッドで必須なパラメータを書く
      # params do
      #   requires :title, type: String, desc: 'title'
      #   requires :author_id, type: Integer, desc: 'article author id'
      # end
      # post do
      #   Article.create(title: params[:title], author_id: params[:author_id])
      # end

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
