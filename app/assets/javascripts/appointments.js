var attachListeners = () => {
  $("#list_appointments").click(function(e) {
    e.preventDefault()
    listAppointments()
  })
  $("#newContactForm").submit(function(e) {
    e.preventDefault()
    var values = $(this).serialize()
    console.log(values)
    submitContactForm(values)
  })
}

var listAppointments = () => {
  alert("HEY")
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
        <p><strong>Contact</strong>: <a href="contacts/${value['contact']['id']}">${value['contact']['name']}</a>
         - ${value['contact']['email']} - ${value['contact']['phone_number']}</p>
        <p><strong>Location</strong>: <a href="locations/${value['location']['id']}">${value['location']['name']}</a></p>
        <fieldset><legend></legend></fieldset>
        <a href='/appointments/${value['id']}/edit'>Edit</a> |
        <a data-confirm="Are you sure?" data-method="delete" href="/appointments/${value['id']}" rel="nofollow">Delete</a> |
        <a href="/appointments">Back</a>
        <br />
      </div>`
      $("#appointments_list").append(appt_div)
    })
  })
}

var submitContactForm = (values) => {

}

$(() => {
  attachListeners()
})
