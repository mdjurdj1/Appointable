var Location = function(data) {
  this.name = data.name
  this.street_address = data.street_address
  this.zip_code = data.zip_code
  this.state = data.state
  this.appointments = {
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