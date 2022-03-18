class Api::MenuItemsController < ApplicationController
  def index
    @menu_items = MenuItem.all.includes(:serve_dates)
    # @menu_items = MenuItem.all.includes(serve_dates: { start_time: { comparison: { greater_than: Date.today, less_than: Date.today+7.days} } })
    # @menu_items = MenuItem.all.includes(:serve_dates)
#     menu_items = MenuItem.joins(:serve_dates).where(
#   'serve_dates.start_time BETWEEN ? AND ?', Date.today, Date.today+7.days
# )
# from_sql = ServeDate.where('start_time BETWEEN ? AND ?', Date.today, Date.today+7.days)
# @menu_items = MenuItem.all.includes(:serve_dates).from(from_sql)
# sql = "SELECT * FROM menu_items INNER JOIN serve_dates ON serve_dates.menu_item_id = menu_items.id AND serve_dates.start_time BETWEEN ? and ?", Date.today, Date.today+7.days
# @menu_items = MenuItem.find_by_sql(sql)
# @menu_items = ActiveRecord::Base.connection.execute(sql)
# debugger
#     @shippingservices = Shippingservice.joins(carts: :cart_items).where(
#   '(cart_items.weight * cart_items.amount) BETWEEN ? AND ?', :weightmin, :weightmax
# )
      # .where(serve_date: 'start_time > :start AND start_time < :end', start: Date.today, end: Date.today+7.days)
    # @menu_items = MenuItem.all.includes(:serve_dates)
    #   .where(serve_dates: { start_time: { greater_than: Date.today, less_than: Date.today+7.days} })
    # serve_dates = menu_item.serve_dates.where("start_time >= ? AND start_time <= ? ", Date.today, Date.today+time_window)
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
