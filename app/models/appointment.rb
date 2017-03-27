class Appointment < ApplicationRecord
  # validates :contact_id, presence: true
  # validates :location_id, presence: true
  validates_associated :contact
  validates_associated :location
  # accepts_nested_attributes_for :location

  belongs_to :user
  belongs_to :contact
  belongs_to :location
  scope :search, lambda {|search| where(["name LIKE ?", "%#{search}%"])}


  def contact_attributes=(contact_attr)
    if contact_attr[:name].present?
      self.contact = self.user.contacts.find_or_create_by(contact_attr)
    end
  end

  def location_attributes=(location_attr)
    if location_attr[:name].present?
      self.location = self.user.locations.find_or_create_by(location_attr)
    end
  end

end
