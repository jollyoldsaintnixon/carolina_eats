json.partial! 'api/menu_items/menu_item', menu_item: @menu_item
json.serve_dates do 
    json.array! @menu_item.serve_dates do |serve_date|
        json.extract! serve_date, :id, :end_time, :start_time, :location
    end
end

# example:
# json.array! @votations do |votation|
#     json.id votation.id
#     json.description votation.description
#     json.status votation.status
#     json.name votation.name
#     json.options do
#       json.array! votation.options, :id, :name, :votation_id
#     end
#   end

# @menu_items.each do |menu_item|
#     json.set! menu_item.id do
#         json.partial! 'api/menu_items/menu_item', menu_item: menu_item
#     end
# end