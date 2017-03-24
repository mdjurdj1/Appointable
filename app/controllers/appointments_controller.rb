class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :edit, :update]

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

  def update
    if @appointment.update(appointment_params)
      flash[:notice] = "Successfully updated appointment!"
      redirect_to appointment_path(@appointment)
    else
      render :edit, flash[:notice] => "Update unsuccessful"
    end
  end


  private
  def set_appointment
    @appointment = Appointment.find_by(id: params[:id])
  end

  def appointment_params
    params.require(:appointment).permit(:name, :description, :start_time, :contact_attributes => [:name, :email, :phone_number])
  end

end
