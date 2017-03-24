class Appointment < ApplicationRecord
  belongs_to :user
  has_one :contact
  validates_associated :contact
  # accepts_nested_attributes_for :contact

  def contact_attributes=(contact_attr)
    if contact_attr[:name].present?
      self.contact = self.user.contacts.find_or_create_by(contact_attr)
    end
  end

end
