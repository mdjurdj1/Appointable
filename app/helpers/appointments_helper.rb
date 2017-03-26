module AppointmentsHelper

  def appt_start_time(appointment)
    appointment.start_time.strftime("%A, %b %e, at %l:%M %p")
  end

end
