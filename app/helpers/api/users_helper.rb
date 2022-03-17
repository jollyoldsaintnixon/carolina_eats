module Api::UsersHelper
    def find_and_make_serve_date_messages(user, time_window=User::DEFAULT_NOTIFICATION_WINDOW)
        serve_date_messages = []
        user.menu_items.each do |m|
            m.serve_dates.each do |s|
                if s.start_time.between?(Date.today, Date.today+time_window)
                    serve_date_messages.push("#{s.location.capitalize} will serve #{m.name} in #{distance_of_time_in_words(s.start_time)} at #{s.start_time.strftime("%I:%M %p")}")
                end
            end
        end
    end

    def find_serve_dates_for_all(time_window=User::DEFAULT_NOTIFICATION_WINDOW)
        users = User.all.includes(menu_items: [:serve_dates])
        users.each do |u| 
            find_serve_dates(u, time_window)
        end
    end

    def distance_of_time_in_words(time_from, time_until=Time.now) 
        
        delta = time_from - time_until
        delta = delta.round
        if delta < 0
            return "that time is in the past"
        end
        case delta
        when 0.seconds...120.seconds
            return "right now"
        when 2.minute...60.minutes
            minutes = delta/60
            return "in about #{minutes} minutes"
        when 1.hour...4.hours 
        # when 3660..10800 #1..3 hours 
            hours = delta/3600
            str_hour = hours > 1 ? "hours" : "hour"
            minutes = (delta/60) % 60
            str_minute = minutes > 1 ? "minutes" : "minute"
            return "in about #{hours} #{str_hour} and #{minutes} #{str_minute}"
        when 4.hours...24.hours
            hours = delta/3600
            return "in about #{hours} hours"
        else
            days = delta/86400
            str_day = days > 1 ? "days" : "day"
            return "in #{days} #{str_day}"
        end

    end
end
