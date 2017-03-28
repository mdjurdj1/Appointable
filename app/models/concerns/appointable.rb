module Appointable

  def has_upcoming_appointments?
    self.appointments.any?{|appt| appt.start_time > DateTime.now}
  end

  def list_upcoming_appointments
    self.appointments.order(start_time: :asc).select{|appt| appt.start_time > DateTime.now}
  end

end
