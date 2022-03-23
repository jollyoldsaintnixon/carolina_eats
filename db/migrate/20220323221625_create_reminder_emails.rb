class CreateReminderEmails < ActiveRecord::Migration[6.1]
  def change
    create_table :reminder_emails do |t|
      t.references :user
      t.references :serve_date
      t.timestamps
    end
  end
end
