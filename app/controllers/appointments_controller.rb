class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :edit]

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
  end

  def edit
  end


  private
  def set_appointment
    @appointment = Appointment.find_by(id: params[:id])
  end

  def appointment_params
    params.require(:appointment).permit(:name, :description, :start_time, :contact_attributes => [:name, :email, :phone_number])
  end

end
