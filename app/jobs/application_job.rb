class ApplicationJob < ActiveJob::Base
  # Automatically retry jobs that encountered a deadlock
  # retry_on ActiveRecord::Deadlocked

  # Most jobs are safe to ignore if the underlying records are no longer available
  # discard_on ActiveJob::DeserializationError
  def first_add_check(menu_item, time_window=10.days)
    serve_dates = menu_item.serve_dates.where("start_time >= ? AND start_time <= ? ", Date.today, Date.today+time_window)
  end
end
