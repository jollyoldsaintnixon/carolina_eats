json.set! @today do
    @serve_dates.each do |serve_date|
        json.set! serve_date.menu_item.name do 
            json.partial! 'api/serve_dates/serve_date', serve_date: serve_date
        end
    end
end