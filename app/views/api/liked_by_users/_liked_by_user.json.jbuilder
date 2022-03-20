json.extract! lbu.menu_item, :id, :name, :category
json.extract! lbu, :updated_at
json.serve_dates do
    json.array! lbu.menu_item.serve_dates do |serve_date|
        json.extract! serve_date, :id, :end_time, :start_time, :location
    end
end