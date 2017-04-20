class AppointmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_appointment, only: [:index, :show, :edit, :update, :destroy]
  before_action :set_appointments, only: [:index, :new, :edit]
  before_action :evaluate_params, only: [:index]

  def index
  end

  def new
    @appointment = current_user.appointments.build
  end

  def create
    @appointment = Appointment.new(appointment_params.merge(user_id: current_user.id)) #instantiate an appointment associated with user, but unsaved
    if @appointment.save
      redirect_to appointment_path(@appointment)
    else #reset user association on failed appointment save, set @appointments to disclude unpersisted appointment for partial
      @appointment.user = nil
      @appointments = current_user.appointments.select { |appt| appt.persisted? }
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
      @appointment.user = nil
      @appointments = current_user.appointments.select { |appt| appt.persisted? }
      render :edit
    end
  end

  def destroy
    @appointment.delete
    flash[:notice] = "Successfully deleted appointment!"
    redirect_to appointments_path
  end

  def list
    respond_to do |f|
      f.json { render json: current_user.appointments }
    end
  end


  private
  def set_appointments
    @appointments = current_user.appointments.all
  end

  def set_appointment
    @appointment = current_user.appointments.find_by(id: params[:id])
  end

  def appointment_params
    params.require(:appointment).permit(:name, :description, :contact_id, :location_id, :start_time, :contact_attributes => [:name, :email, :phone_number], :location_attributes => [:name])
  end

  def evaluate_params
    if params[:location_id]
      if current_user.locations.find_by(id: params[:location_id])
        @appointments = current_user.locations.find_by(id: params[:location_id]).list_upcoming_appointments
        render "appointments_without_calendar"
      else
        redirect_to appointments_path
      end
    elsif params[:contact_id]
      if current_user.contacts.find_by(id: params[:contact_id])
        @appointments = current_user.contacts.find_by(id: params[:contact_id]).list_upcoming_appointments
        render "appointments_without_calendar"
      else
        redirect_to appointments_path
      end
    elsif params[:week]
      render "simple_calendar/_weekly_calendar_appointments", locals: {appointments: @appointments}
    elsif params[:list]
      @appointments = current_user.list_upcoming_appointments
      render "appointments_without_calendar"
    end
  end
end
