class AppointmentsController < ApplicationController

  def index
    @appointments = current_user.appointments.all
  end

  def new
    @appointment = Appointment.new
  end

end
