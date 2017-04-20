$(document).ready(function() {
  attachListeners()
})

var attachListeners = () => {
  $("#list_appointments").on("click", function(e) {
    listAppointments()
  })
}

var listAppointments = () = > {}