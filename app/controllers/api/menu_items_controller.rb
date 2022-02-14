class Api::MenuItemsController < ApplicationController
  def index
    @menu_items = MenuItem.all
  end

  def show
    @menu_item = MenuItem.find(params[:id])
  end

  def liked
  end

  def update
  end

  def destroy
  end
end
