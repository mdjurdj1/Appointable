class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :contact
  has_one :location
  # validates_associated :contact
  validates :contact_id, presence: true
  # accepts_nested_attributes_for :contact

  def contact_attributes=(contact_attr)
    if contact_attr[:name].present?
      self.contact = self.user.contacts.find_or_create_by(contact_attr)
    end
  end

end
