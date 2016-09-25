module API
  class Api < Grape::API
    version 'v1', using: :path
    format :json
    prefix :api

    resource :radios do
      # descには説明を書く
      desc 'Return public articles.'
      get :all do
        Radio.all
      end

      # # route_paramを使うとname spaceのように区切れる
      # route_param :id do
      #   desc 'Return a active article'
      #   get do
      #     Article.find_by(id: params[:id], status: true)
      #   end
      # end

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
