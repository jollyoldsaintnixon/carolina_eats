# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord

    has_many :liked_by_users
    # ,
    # class_name: :liked_by_user,
    # foreign_key: :user_email,
    # primary_key: :email
    
    has_many :menu_items,
    through: :liked_by_users

    has_many :serve_dates,
    through: :menu_items
    # has_secure_password
    validates :password_digest, :session_token, :email, presence: true
    validates :email, :session_token, uniqueness: true
    validates :password, length: {minimum: 6, allow_nil: true}
    validate :valid_email?

    attr_reader :password

    after_initialize :ensure_token

    DEFAULT_NOTIFICATION_WINDOW = 10.days

    def self.find_by_credentials(email, password) 
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        return user
    end
    
    def self.generate_token()
        SecureRandom.urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    # def confirm_password=(confirm_password)
    #     @confirm_password = confirm_password
    # end

    def is_password?(password)
        bc = BCrypt::Password.new(self.password_digest)
        bc.is_password?(password)
    end
    
    def reset_token! #dangerous because of save!
        self.session_token = User.generate_token
        self.save!
        self.session_token
    end

    def ensure_token
        self.session_token ||= User.generate_token
    end

    private 

    def valid_email?
        return unless self.email
        at_split = self.email.split('@')
        if at_split.length != 2
          errors.add(:email, 'is invalid') 
          return false
        end
        dotSplit = at_split[1].split('.')
        return dotSplit.length > 1 ? true : errors.add(:email, 'is invalid')
        false
    end
end
