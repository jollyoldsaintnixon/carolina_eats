class Api::MenuItemsController < ApplicationController
  def index
    @menu_items = MenuItem.all.includes(:serve_dates)
    render 'with_serve_dates_index'
  end

  def name_index
    @menu_items = MenuItem.all
    # render 'item_only_index'
    render json: MenuItem.all.pluck(:name, :id) # so, so much quicker than doing the normalized jbuilder version above
  end

  def show
    @menu_item = MenuItem.includes(:serve_dates).find(params[:id])
  end

end
