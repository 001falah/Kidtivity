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
    const response = await fetch('https://script.google.com/macros/s/AKfycbx0s8AmdBZd6AtQbn8IY196rjGF27lYhnFOC0QZ9TTsX04oM2YKQVWBI1meqIJFMe77zg/exec', {
      method: 'POST',
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
      alert("Sorry, something went wrong: " + (result.message || "Unknown error"));
    }
  } catch (error) {
    alert("Sorry, something went wrong: " + error.message);
  }
});
