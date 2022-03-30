namespace :default_reminder_email do
    desc 'sends an email to user when a liked item is to be served within a prespecified number of day'
    task default_send: :environment do
        error_messages = {}
        User.all.each do |user|
            puts "attempting to send reminder email to #{user.email} at #{Time.now}"
            puts Rails.env
            serve_dates = user.serve_dates.where("start_time >= ? AND start_time <= ? ", Date.today, Date.today+User::DEFAULT_NOTIFICATION_WINDOW)
            menu_messages = Hash.new { |h, k| h[k] = []}
            serve_dates.each do |sd|
                if !ReminderEmail.find_by(user: user, serve_date: sd)
                    r=ReminderEmail.create(user: user, serve_date: sd)
                    if r.save
                        puts "reminder email created"
                        menu_item = sd.menu_item.name
                        message = "#{menu_item} will be served at #{sd.location} at #{sd.start_time}"
                        menu_messages[menu_item].push(message)
                    else  
                        puts "could not create reminder email properly"
                        puts r.errors.full_messages
                        error_messages[user] = {}
                        error_messages[user.email][serve_date.menu_item.name] = r.errors.full_messages
                    end
                else  
                    puts "reminder email already sent"
                end
            end
            if !menu_messages.empty?
                email = ReminderMailer.with(user: user, menu_messages: menu_messages).reminder_email
                email.deliver_now
                puts "delivered reminder eamil"
            end
            if !error_messages.empty?
                AdminMailer.with(errors: error_messages).reminder_email_creation_errors.deliver_now
            end
        end
    end
end