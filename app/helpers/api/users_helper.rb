module Api::UsersHelper
    def find_serve_dates(time_window=10.days)
        users = User.all.includes(menu_items: [:serve_dates])
        users.each do |u|  
            u.menu_items.each do |m|
                m.serve_dates.each do |s|
                    if s.start_time.between?(Date.today-time_window, Date.today)
                        puts "#{s.location.capitalize} will serve #{m.name} in #{distance_of_time_in_words(s.start_time, Time.now)} at #{s.start_time.strftime("%I:%M %p")}"
                    end
                end
            end
        end
    end
end
