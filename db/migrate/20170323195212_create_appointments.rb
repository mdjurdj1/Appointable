class CreateAppointments < ActiveRecord::Migration[5.0]
  def change
    create_table :appointments do |t|
      t.belongs_to :user
      t.belongs_to :contact
      t.belongs_to :location
      t.string :name
      t.string :description
      t.datetime :start_time

      t.timestamps
    end
  end
end
