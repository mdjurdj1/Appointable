class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number, :email
  has_many :appointments
  has_many :locations
end
