module ContactsHelper

  def has_complete_fields?(contact)
    contact && contact.name && contact.email && contact.phone_number
  end

  def only_has_name_field?(contact)
    contact 
  end

end
