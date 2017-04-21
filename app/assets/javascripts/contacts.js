var Contact = function(data) {
  this.email = data.id;
  this.phone_number = data.phone_number;
};

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

var createContactFromForm = (values) => {
  $.ajax({
      url: '/contacts.json',
      type: 'POST',
      data: values,
      dataType: 'JSON',
      success: function(data) {
      var contact = new Contact(data);
      // var response = location.buildLocation({skipIndexLink: true});
      var response = `
        <div class="boxed">
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
        </div><br />`
      $('#hiddenContactField').html(response);
    }
  });
}

var showContactForm = () => {
  $('#hiddenContactField').removeClass('hidden');
}
