$(document).ready(function() {
  attachListeners()
})

var attachListeners = () => {
  $("#list_appointments").on("click", function() {
    listAppointments()
  })
}

var listAppointments = () => {
  $("#list_appointments").hide()
  $(".notice").hide()
  $.get('/list', function(data) {
    $.each(data, function(index, value) {
      var appt_div = `
      <div class="boxed">
        <fieldset>
          <legend>${value['name']}</legend>
        </fieldset>
        <p><strong>Description</strong>: ${value['description']}</p>
        <p><strong>Start Time</strong>: ${value['start_time']}</p>
        <p><strong>Contact</strong>: ${value['contact']['name']} - ${value['contact']['email']} - ${value['contact']['phone_number']}</p>
        <p><strong>Location</strong>: ${value['location']['name']}</p>
        <a href='/appointments/${value['id']}/edit'>Edit</a> |
        <a data-confirm="Are you sure?" data-method="delete" href="/appointments/${value['id']}" rel="nofollow">Delete</a> |
        <a href="/appointments">Back</a>
        <br />
      </div>`
      $("#appointments_list").append(appt_div)
    })
  })
}
