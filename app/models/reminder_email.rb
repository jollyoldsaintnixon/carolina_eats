# == Schema Information
#
# Table name: reminder_emails
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  serve_date_id :bigint
#  user_id       :bigint
#
# Indexes
#
#  index_reminder_emails_on_serve_date_id  (serve_date_id)
#  index_reminder_emails_on_user_id        (user_id)
#
class ReminderEmail < ApplicationRecord
    
end
