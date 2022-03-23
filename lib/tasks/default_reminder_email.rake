namespace :default_reminder_email do
    desc 'sends an email to user when a liked item is to be served within a prespecified number of day'
    task default_send: :environment do
        User.all.each do |user|
            puts "attempting to send reminder email to #{user.email}"
            puts Rails.env
            serve_dates = user.serve_dates.where("start_time >= ? AND start_time <= ? ", Date.today, Date.today+User::DEFAULT_NOTIFICATION_WINDOW)
            # puts "serve dates"
            # puts serve_dates
            puts "google pass:"
            puts ENV["GMAIL_PASSWORD"]
            puts ENV["GMAIL_USERNAME"]
            menu_messages = Hash.new { |h, k| h[k] = []}
            serve_dates.each do |sd|
                menu_item = sd.menu_item.name
                message = "#{menu_item} will be served at #{sd.location} at #{sd.start_time}"
                menu_messages[menu_item].push(message)
            end
            if !menu_messages.empty?
                email = ReminderMailer.with(user: user, menu_messages: menu_messages).reminder_email
                # puts email
                email.deliver_now
            end
            puts menu_messages
        end
    end
end