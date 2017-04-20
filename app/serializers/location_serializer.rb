class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :street_address, :zip_code, :state, :city
  has_many :appointments
end
