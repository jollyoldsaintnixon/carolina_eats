class FirstAddJob < ApplicationJob
  include Api::UsersHelper
  queue_as :default

  def first_add_check(menu_item, time_window=User::DEFAULT_NOTIFICATION_WINDOW)
    serve_dates = menu_item.serve_dates.where("start_time >= ? AND start_time <= ? ", Date.today, Date.today+time_window)
    debugger
  end

  def perform(user, time_window=User::DEFAULT_NOTIFICATION_WINDOW)
    menu_items = user.menu_items.includes(:serve_dates) # custom sql to make this only find serve_dates within date range
    puts menu_items
    upcoming_serve_date_messages = find_and_make_serve_date_messages(user, time_window)
    email = ReminderMailer.with(user: user, messages: upcoming_serve_date_messages).reminder_email # later, later
    puts upcoming_serve_date_messages
    
    # menu_items.each do |m|
    #   serve_dates = m.serve_dates.where("start_time >= ? AND start_time <= ? ", Date.today, Date.today+time_window)
    # end
  end
end