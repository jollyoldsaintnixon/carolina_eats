@menu_items.each do |menu_item|
    json.set! menu_item.id do
        json.partial! 'api/menu_items/with_serve_dates', menu_item: menu_item
    end
end