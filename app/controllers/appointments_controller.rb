class AppointmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_appointment, only: [:show, :edit, :update, :destroy]

  def index
    @appointments = current_user.appointments.all
  end

  def new
    @appointment = current_user.appointments.build
  end

  def create
    @appointment = Appointment.new(appointment_params.merge(user_id: current_user.id)) #instantiate an appointment associated with user, but unsaved
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
      render :edit, flash[:notice] => "Update unsuccessful."
    end
  end

  def destroy
    @appointment.delete
    flash[:notice] = "Successfully deleted appointment!"
    redirect_to appointments_path
  end


  private
  def set_appointment
    @appointment = Appointment.find_by(id: params[:id])
  end

  def appointment_params
    params.require(:appointment).permit(:name, :description, :contact_id, :location_id, :start_time, :contact_attributes => [:name, :email, :phone_number], :location_attributes => [:name])
  end

end
