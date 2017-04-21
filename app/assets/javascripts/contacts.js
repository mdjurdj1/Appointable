$(document).ready(function() {
  $("button").click(function(e) {
    var url = $(this).data("nextUrl")
    $.get(url, function(data) {
      if (data) {
        $(".boxed").empty()
          var contact_div = `
            <fieldset>
              <legend>${data['name']}</legend>
            </fieldset>
            <p><strong>Email</strong>: ${data['email']}</p>
            <p><strong>Phone Number</strong>: ${data['phone_number']}</p>
            <fieldset><legend></legend></fieldset>
            <a href='/contacts/${data['id']}/edit'>Edit</a> |
            <a data-confirm="Are you sure?" data-method="delete" href="/contacts/${data['id']}" rel="nofollow">Delete</a> |
            <a href="/contacts">Back</a>
            <br />`
          $(".boxed").append(contact_div)
       } else {
         alert("No next contact remains!")
       }
    })
  })
})
