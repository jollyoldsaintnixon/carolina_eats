class Api::MenuItemsController < ApplicationController
  def index
    @menu_items = MenuItem.all.includes(:serve_dates)
  end

  def show
    @menu_item = MenuItem.includes(:serve_dates).find(params[:id])
  end

  def liked
  end

  def update
  end

  def destroy
  end
end
