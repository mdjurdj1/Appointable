class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :appointments
  has_many :contacts
  has_many :locations
  # scope :upcoming_appointments, -> { joins(:appointments).where('appointments.start_time > ?', DateTime.now) }

  def upcoming_appointments
    self.appointments.order(start_time: :desc).select{|appt| appt.start_time > DateTime.now}
  end
end
