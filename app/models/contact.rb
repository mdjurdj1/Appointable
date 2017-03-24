class Contact < ApplicationRecord
  belongs_to :appointment
  validates :name, presence: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :phone_number, format: { with: /\A\d{3}-\d{3}-\d{4}\z/ }
end
