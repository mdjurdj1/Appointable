////APPOINTMENT MODEL AND PROTOTYPE METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var Appointment = function(data) {
  this.name = data.name
  this.description = data.description
  this.start_time = data.start_time
  this.contact = {
    id: data.contact.id,
    name: data.contact.name,
    email: data.contact.email,
    phone_number: data.contact.phone_number
  }
  this.location = {
    id: data.location.id,
    name: data.location.name
  }
}

Appointment.prototype.showContactFields = function() {
  output = `
  <p><strong>Contact</strong>: <a href="contacts/${this.contact.id}">${this.contact.name}</a>
   - ${this.contact.email} - ${this.contact.phone_number}</p>`
   return output
}

Appointment.prototype.showLocationFields = function() {
  output = `
  <p><strong>Location</strong>: <a href="locations/${this.location.id}">${this.location.name}</a></p>`
   return output
}

Appointment.prototype.showLinkFields = function() {
  output = `
  <a href='/appointments/${this.id}/edit'>Edit</a> |
  <a data-confirm="Are you sure?" data-method="delete" href="/appointments/${this.id}" rel="nofollow">Delete</a> |
  <a href="/appointments">Back</a>`
  return output
}

Appointment.prototype.showLegendHeader = function() {
  output = `
  <fieldset>
    <legend>${this.name}</legend>
  </fieldset>`
  return output
}

Appointment.prototype.showInfoFields = function() {
  output = `
  <p><strong>Description</strong>: ${this.description}</p>
  <p><strong>Start Time</strong>: ${this.start_time}</p>`
  return output
}

//// LOADING LISTENERS AND LISTENER DEPENDENCIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var attachListeners = () => {
  $("#list_appointments").click(function(e) {
    e.preventDefault()
    listAppointments()
  })
  $("#newContactForm").submit(function(e) {
    e.preventDefault()
    var values = $(this).serialize()
    createContactFromForm(values)
  })
  $(".showApptLink").click(function(e) {
    e.preventDefault()
    var id = $(this).attr("data-thisId")
    showAppointmentsForId(id)
  })
  $('#appointmentModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('id') // Extract info from data-* attributes
    var modal = $(this)
    modal.find(".modal-body").text('')
    getAppointmentData(id, modal)
  })
}

var getAppointmentData = (id, modal) => {
  var data = $.get(`/locations/${id}/getAppointmentData`, function(data) {
    renderAppointmentData(data, modal)
  })
}

var renderAppointmentData = (data, modal) => {
  data.forEach((appointment) => {
     modal.find(".modal-body").append(`
       <li>
       <h4>${appointment.name}</h4>
       <p>Contact: ${appointment.contact.name}</p>
       <p>${appointment.description}</p>
       <p>${appointment.start_time}</p>
       </li>
       <hr/>
     `)
  })
}

var listAppointments = () => {
  $("#list_appointments").hide()
  $(".notice").hide()
  $.get('/list', function(data) {
    $.each(data, function(index, value) {
      let currentAppointment = new Appointment(value)
      var appt_div = `
      <div class="boxed">
        ${currentAppointment.showLegendHeader()}
        ${currentAppointment.showInfoFields()}
        ${currentAppointment.showContactFields()}
        ${currentAppointment.showLocationFields()}
        <fieldset><legend></legend></fieldset>
        ${currentAppointment.showLinkFields()}
        <br />
      </div>`
      $("#appointments_list").append(appt_div)
    })
  })
}


$(document).on('turbolinks:load', function() {
  attachListeners()
})
