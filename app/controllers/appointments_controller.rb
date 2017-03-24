class AppointmentsController < ApplicationController

  def index
    @appointments = current_user.appointments.all
  end

  def new
    @appointment = current_user.appointments.build
  end

  def create
    @appointment = current_user.appointments.build(appointment_params)
    if @appointment.save
      redirect_to appointment_path(@appointment)
    else
      render :new
    end
  end

  def show
    @appointment = Appointment.find_by(id: params[:id])
  end


  private
  def appointment_params
    params.require(:appointment).permit(:name, :description, :start_time)
  end

end
