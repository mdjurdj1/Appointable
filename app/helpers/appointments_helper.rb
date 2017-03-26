module AppointmentsHelper

  def appt_start_time(appointment)
    appointment.start_time.strftime("%A, %b %e, at %l:%M %p")
  end

  def show_monthly_calendar(appointments)
      render partial: "simple_calendar/monthly_calendar_appointments", locals: {appointments: appointments}
   end

end
