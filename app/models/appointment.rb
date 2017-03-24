class Appointment < ApplicationRecord
  belongs_to :user
  has_one :contact
  # accepts_nested_attributes_for :contact

  def contact_attributes=(contact_attr)
    if Contact.find_by(name: contact_attr[:name])
      self.contact = Contact.find_by(name: contact_attr[:name])
    else
      self.create_contact(contact_attr)
  end
end

end
