class Location < ApplicationRecord
  include Appointable
  
  validates :name, presence: true
  before_save :nil_if_blank

  belongs_to :user
  has_many :appointments
  scope :search, lambda {|search| where(["name LIKE ?", "%#{search}%"])}

  private
    def nil_if_blank
      attributes.each do |column, value|
        self[column].present? || self[column] = nil
      end
    end

end
