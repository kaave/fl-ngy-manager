module API
  class Api < Grape::API
    prefix :api                 # add api prefix to path
    version 'v1', using: :path  # add api version to path
    format :json

    class RadioEntity < Grape::Entity
      expose :id, :name, :url
    end

    resource :radios do
      # descには説明を書く
      desc 'Return all articles.'
      get :all do
        present Radio.all, with: RadioEntity
      end

      route_param :id do
        desc 'Return a active article'
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
