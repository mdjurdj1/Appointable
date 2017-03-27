class Location < ApplicationRecord
  include Appointable
  validates :name, presence: true
  validates :zip_code, format: { with: %r{\d{5}(-\d{4})?} }, allow_blank: true
  before_save :nil_if_blank

  belongs_to :user
  has_many :appointments, dependent: :destroy

  scope :search, lambda {|search| where(["name LIKE ?", "%#{search}%"])}

  private
    def nil_if_blank #convert blank columns to nil for view helpers
      attributes.each do |column, value|
        self[column].present? || self[column] = nil
      end
    end
end
