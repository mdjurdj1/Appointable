var nextContact = () => {
    var url = $("#next_contact").attr("data-nextUrl")
    $.get(url, function(data) {
      if (data !== null) {
        var next_url = `/contacts/${data['id']+1}/get`
        $(".boxed").empty()
          var contact_div = `
            <fieldset>
              <legend>${data['name']}</legend>
            </fieldset>
            <p><strong>Email</strong>: ${data['email']}</p>
            <p><strong>Phone Number</strong>: ${data['phone_number']}</p>
            <p><a href="" class="link" data-thisId="${data['id']}" onclick="showAppointments(); return false;">Click to view upcoming appointments with this Contact.</a></p>
            <ul id="contactAppts"></ul>
            <fieldset><legend></legend></fieldset>
            <a href='/contacts/${data['id']}/edit'>Edit</a> |
            <a data-confirm="Are you sure?" data-method="delete" href="/contacts/${data['id']}" rel="nofollow">Delete</a> |
            <a href="/contacts">Back</a>
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
  $(".link").hide()
  $("#contactAppts").append("<p><strong>Appointments List</strong></p>")
  $.get(contactDataUrl, function(data) {
    $(data['appointments']).each(function(index, value) {
      var appointmentLi = `<li>
      <a href="/appointments/${value['id']}">${value['name']}</a>
      </li> <br />`
      $("#contactAppts").append(appointmentLi)
    })
  })
  return false
}
