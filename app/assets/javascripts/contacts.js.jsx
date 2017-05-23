////CONTACT MODEL AND PROTOTYPE METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var Contact = function(data) {
  this.name = data.name
  this.email = data.email
  this.phone_number = data.phone_number
}

Contact.prototype.showInfoFields = function() {
  output = `
  <fieldset>
    <legend>${this.name}</legend>
  </fieldset>
  <p><strong>Email</strong>: ${this.email}</p>
  <p><strong>Phone Number</strong>: ${this.phone_number}</p>`
  return output
}

Contact.prototype.showLinkFields = function() {
  output = `<a href='/contacts/${this.id}/edit'>Edit</a> |
  <a data-confirm="Are you sure?" data-method="delete" href="/contacts/${this.id}" rel="nofollow">Delete</a> |
  <a href="/contacts">Back</a>`
  return output
}

////AJAX REQUEST FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var nextContact = () => {
    var url = $("#next_contact").attr("data-nextUrl")
    $.get(url, function(data) {
      if (data !== null) {
        let currentContact = new Contact(data)
        var next_url = `/contacts/${data['id']+1}/get`
        $(".boxed").empty()
          var contact_div = `
            ${currentContact.showInfoFields()}
            <p><a href="" class="link" data-thisId="${data['id']}" onclick="showAppointments(); return false;">Click to view upcoming appointments with this Contact.</a></p>
            <ul id="contactAppts"></ul>
            <fieldset><legend></legend></fieldset>
            ${currentContact.showLinkFields()}
            <br />`
          $(".boxed").append(contact_div)
          $("#next_contact").attr("data-nextUrl", next_url)
       } else {
         alert("No next contact remains!")
       }
    })
  }

var showAppointments = () => {
  var contactId = $(".link").attr("data-thisId")
  var contactDataUrl = `/contacts/${contactId}/get`
  $("#contactAppts").append("<p><strong>Appointments List</strong></p>")
  $.get(contactDataUrl, function(data) {
    if (data !== null) {
      $(data['appointments']).each(function(index, value) {
        var appointmentLi = `<li>
        <a href="/appointments/${value['id']}">${value['name']}</a> | ${value['start_time']}
        </li>`
        $("#contactAppts").append(appointmentLi)
      })
    } else {
      $("#contactAppts").append("No appointments were found for this contact.")
    }
  })
  return false
}

var showAppointmentsForId = (id) => {
  var contactId = id
  var contactDataUrl = `/contacts/${id}/get`
  $(`#contact${id}Appts`).html("")
  $(`#contact${id}Appts`).append("<p><strong>Appointments List</strong></p>")
  $.get(contactDataUrl, function(data) {
    if (data !== null) {
      $(data['appointments']).each(function(index, value) {
        var appointmentLi = `<li>
        <a href="/appointments/${value['id']}">${value['name']}</a> | ${value['start_time']}
        </li>`
        $(`#contact${id}Appts`).append(appointmentLi)
      })
    }
  })
  return false
}

var createContactFromForm = (values) => {
  $.ajax({
      url: '/contacts.json',
      type: 'POST',
      data: values,
      dataType: 'JSON',
      success: function(data) {
        let currentContact = new Contact(data);
        var response = `
          <div class="boxed">
          ${currentContact.showInfoFields()}
          <p><a href="" class="link" data-thisId="${data['id']}" onclick="showAppointments(); return false;">Click to view upcoming appointments with this Contact.</a></p>
          <ul id="contactAppts"></ul>
          <fieldset><legend></legend></fieldset>
          ${currentContact.showLinkFields()}
          </div><br />`
        $('#hiddenContactField').html(response);
      }
  });
}

//// LOADING LISTENERS AND LISTENER DEPENDENCIES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var showContactForm = () => {
  $('button').hide()
  $('#hiddenContactField').removeClass('hidden');
}
