class AddTimestampsToLbu < ActiveRecord::Migration[6.1]
  def change
    add_column :liked_by_users, :updated_at, :datetime, null: false
  end
end
