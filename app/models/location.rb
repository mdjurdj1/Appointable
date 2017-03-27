class Location < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :appointments
  scope :search, lambda {|search| where(["name LIKE ?", "%#{search}%"])}

  def has_upcoming_appointments

  end
end
