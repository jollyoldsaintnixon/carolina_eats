# == Schema Information
#
# Table name: menu_items
#
#  id         :bigint           not null, primary key
#  category   :string           not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_menu_items_on_name_and_category  (name,category) UNIQUE
#
class MenuItem < ApplicationRecord
    has_many :liked_by_users#, -> { order(start_time: :desc) }

    has_many :serve_dates
    
    has_many :users,
    through: :liked_by_users

    validates :name, :category, presence: true
    validates :name, uniqueness: true

    DIETARY_RESTRICTIONS=["vegan", "smart_choice", "local", "organic", "made_without_gluten", "vegetarian", "halal", "sustainable_seafood"]
end
