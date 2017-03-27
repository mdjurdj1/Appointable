module AppointmentsHelper

  def appt_start_time(appointment)
    appointment.start_time.strftime("%A, %b %e, at %l:%M %p")
  end

  def show_weekly_calendar(appointments)
      render partial: "simple_calendar/weekly_calendar_appointments", locals: {appointments: appointments}
   end

   def show_contact_fields
   end 

end
