module LocationsHelper

  def has_empty_fields?(location)
    location.street_address == nil || location.zip_code == nil|| location.city == nil || location.state == nil
  end


end
