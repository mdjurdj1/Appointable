class Location < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :appointments
  scope :search, lambda {|search| where(["name LIKE ?", "%#{search}%"])}

  def has_upcoming_appointments?
    self.appointments.any?{|appt| appt.start_time > DateTime.now}
  end

  def list_upcoming_appointments
    self.appointments.order(start_time: :desc).select{|appt| appt.start_time > DateTime.now}
  end
end
