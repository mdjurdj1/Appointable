class Appointment < ApplicationRecord
  validates :contact_id, presence: true

  belongs_to :user
  belongs_to :contact
  belongs_to :location

  def contact_attributes=(contact_attr)
    if contact_attr[:name].present?
      self.contact = self.user.contacts.find_or_create_by(contact_attr)
    end
  end

end
