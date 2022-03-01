# == Schema Information
#
# Table name: serve_dates
#
#  id           :bigint           not null, primary key
#  end_time     :datetime         not null
#  location     :string           not null
#  start_time   :datetime         not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  menu_item_id :integer
#
# Foreign Keys
#
#  fk_rails_...  (menu_item_id => menu_items.id)
#
class ServeDate < ApplicationRecord
    LOCATIONS = ["Chase", "Top-of-Lenoir"]
    belongs_to :menu_item
    
    validates :start_time, :location, presence: true
    validates :start_time, uniqueness: {
        scope: [:location, :menu_item_id], 
        message: "can't serve the same thing at the same time at the same place"
        }
    validates :location, inclusion: {in: LOCATIONS}
    
    def self.locations()
        LOCATIONS
    end
end
