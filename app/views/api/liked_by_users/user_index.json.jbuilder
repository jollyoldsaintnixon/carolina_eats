@liked_by_users.each do |lbu|
    json.set! lbu.menu_item.id do
        json.partial! "api/liked_by_users/liked_by_user", lbu: lbu
    end
end