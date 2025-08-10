
// Your Google Apps Script Web App URL
document.getElementById('checkoutForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = {
    firstname: this.firstname.value.trim(),
    lastname: this.lastname.value.trim(),
    countrycode: this.countrycode.value.trim(),
    phone: this.phone.value.trim(),
    email: this.email.value.trim(),
    address: this.address.value.trim(),
    state: this.state.value.trim(),
    city: this.city.value.trim(),
    pincode: this.pincode.value.trim()
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw6xEFCeZvIqNUbGutC2SgjnnyM_JSZ0i8hxhzonkG11p5eIBocmeL2Ni4mu2xnR0eE7Q/exec', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.result === "success") {
      alert("Order placed successfully!");
      this.reset();
    } else {
      alert("Sorry, something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Sorry, something went wrong. Please try again.");
  }
});
