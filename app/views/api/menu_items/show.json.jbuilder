json.partial! 'api/menu_items/menu_item', menu_item: @menu_item
json.serve_dates do 
    json.array! @menu_item.serve_dates do |serve_date|
        json.extract! serve_date, :id, :end_time, :start_time, :location
    end
end