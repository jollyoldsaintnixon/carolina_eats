# == Schema Information
#
# Table name: liked_by_users
#
#  id           :bigint           not null, primary key
#  updated_at   :datetime         not null
#  menu_item_id :integer          not null
#  user_id      :integer          not null
#
# Indexes
#
#  index_liked_by_users_on_user_id_and_menu_item_id  (user_id,menu_item_id) UNIQUE
#
class LikedByUser < ApplicationRecord
    belongs_to :user,
    dependent: :delete

    belongs_to :menu_item,
    dependent: :destroy

    validates :user_id, :menu_item_id, presence: true
    validates :user_id, uniqueness: {scope: :menu_item_id} # may not be necessary due to composite index
end
