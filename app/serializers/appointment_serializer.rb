class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :start_time, :created_at, :updated_at
  belongs_to :contact
  belongs_to :location
end
