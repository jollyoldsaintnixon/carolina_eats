json.partial! 'api/menu_items/menu_item', menu_item: @menu_item
json.serve_dates do 
    json.array! @menu_item.serve_dates do |serve_date|
        json.set! serve_date.id do
            json.partial! 'api/serve_dates/serve_date', serve_date: serve_date
        end
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