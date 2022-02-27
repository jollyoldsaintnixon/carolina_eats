class Api::MenuItemsController < ApplicationController
  def index
    @menu_items = MenuItem.all.includes(:serve_dates)
  end

  def name_index
    render json: MenuItem.all.pluck(:name)
  end

  def show
    @menu_item = MenuItem.includes(:serve_dates).find(params[:id])
  end

end
