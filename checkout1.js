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
    const response = await fetch('https://script.google.com/macros/s/AKfycbz6SwuUfhrHZmP7VYfPWgQLWILBSJoJ4J7wlb2Nqo-HAjnIkRR1u34S1c0oo4jVIJ_90A/exec', {
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
