@menu_items.each do |menu_item|
    json.set! menu_item.id do
        json.partial! 'api/menu_items/show', menu_item: menu_item
    end
end