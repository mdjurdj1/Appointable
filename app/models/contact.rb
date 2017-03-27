class Contact < ApplicationRecord
  include Appointable
  validates :name, presence: true
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :phone_number, presence: true, format: { with: /\A\d{3}-\d{3}-\d{4}\z/ }

  belongs_to :user
  has_many :appointments
  has_many :locations, through: :appointments

  scope :search, lambda {|search| where(["name LIKE ?", "%#{search}%"])}

end
