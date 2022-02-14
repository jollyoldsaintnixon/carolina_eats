# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'
require 'set'

ServeDate.destroy_all
MenuItem.destroy_all

items = []
CSV.foreach('db/scraped_data/master_menu.csv', headers: true) do |row|
    items << row.to_h
end
puts items
MenuItem.import(items)

def formatTime(string)
    string.tr!('()', '') # get rid of parens
    raw = string[0...-2] # get rid of pm/am
    if string[-2] == 'p' # ends in 'pm'
        hours = raw.split(":")[0].to_i + 12
        hours = hours.to_s
        minutes = raw.split(":")[1] # could be nil
    else
        hours = raw.split(":")[0]
        minutes = raw.split(":")[1]
    end
    unless minutes
        minutes = "00"
    end
    if hours.length < 2
        # byebug
        hours.insert(0, "0")
    end
    if minutes.length < 2 
        minutes.insert(0, "0")
    end
    time = "#{hours}:#{minutes}"
    return time
end

items = MenuItem.all
serve_dates = []
# debugger
ServeDate::LOCATIONS.each do |location|
    (0..6).each do |day|
        CSV.foreach("db/scraped_data/updates/today+#{day}/#{location}/menu.csv", headers: true) do |row|
            
            date = row["date"]
            serving_time = row["meal"].split(" ")[-1] # "meal"=>"Continental (9am-11am)"
            start_string, end_string = serving_time.split('-') # [(9am, 11am)]
            iso_start = formatTime(start_string)
            iso_end = formatTime(end_string)
            iso_dt_start = "#{date}T#{iso_start}:00-04:00"
            iso_dt_end = "#{date}T#{iso_end}:00-04:00"
            # debugger
            start_time = DateTime.iso8601(iso_dt_start)
            end_time = DateTime.iso8601(iso_dt_end)

            menu_item = items.find {|item| item.name == row["name"]}
            # byebug
            if menu_item
                sd = {
                    location: row["location"],
                    start_time: start_time,
                    end_time: end_time,
                    menu_item_id: menu_item.id,
                }
                # serve_dates << row.to_h
                serve_dates << sd
            else 
                puts "skipped #{row['name']} from #{row['category']}"
            end
        end
    end
end
# puts serve_dates
# byebug
ServeDate.import(serve_dates)


# master_menu = File.read('scraped_data/master_menu.txt')
# created_at = 
# connection = ActiveRecord::Base.connection()
# connection.execute(<<-SQL 
# INSERT INTO menu_items (category, name) 
# VALUES ('breakfast', 'bacon');
# SQL
# )
