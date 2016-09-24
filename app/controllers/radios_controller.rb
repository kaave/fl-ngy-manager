class RadiosController < ApplicationController
  before_action :set_radio, only: [:show]

  def index
    @radios = Radio.all
  end

  def show
  end

  def new
    @radio = Radio.new
  end

  def create
    @radio = Radio.new(radio_params)

    respond_to do |format|
      if @radio.save
        format.html { redirect_to @radio, notice: 'Radio was successfully created.' }
        format.json { render :show, status: :created, location: @radio }
      else
        format.html { render :new }
        format.json { render json: @radio.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def set_radio
      @radio = Radio.find(params[:id])
    end

    def radio_params
      params.require(:radio)
        .permit(:name, :url, :memo)
    end
end
