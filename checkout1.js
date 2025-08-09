// Delivery method toggle buttons
const deliveryBtn = document.getElementById('deliveryBtn');
const storeBtn = document.getElementById('storeBtn');

if (deliveryBtn && storeBtn) {
  deliveryBtn.addEventListener('click', () => {
    deliveryBtn.classList.add('active');
    deliveryBtn.setAttribute('aria-pressed', 'true');
    storeBtn.classList.remove('active');
    storeBtn.setAttribute('aria-pressed', 'false');
  });

  storeBtn.addEventListener('click', () => {
    storeBtn.classList.add('active');
    storeBtn.setAttribute('aria-pressed', 'true');
    deliveryBtn.classList.remove('active');
    deliveryBtn.setAttribute('aria-pressed', 'false');
  });
}

// Payment method toggle buttons
const pmButtons = document.querySelectorAll('.payment-methods button');
pmButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    pmButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
  });
});

// Your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbyOunvP0QSCDhd9W3ujGYnaScxTRqWwkO4aBlDrFhjg0VwrntgZN1PqUOCaY9unVkPLZA/exec';

document.getElementById('checkoutForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const formData = {
    firstname: document.getElementById('firstname').value.trim(),
    lastname: document.getElementById('lastname').value.trim(),
    countrycode: document.getElementById('countrycode').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    state: document.getElementById('state').value.trim(),
    city: document.getElementById('city').value.trim(),
    pincode: document.getElementById('pincode').value.trim(),
  };

  // Send data to Google Sheets via Apps Script Web App
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not OK');
      return response.json();
    })
    .then((data) => {
      // Show thank you popup/message
      alert('Thanks for your order! We will confirm it soon.');
      // Reset form
      document.getElementById('checkoutForm').reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    });
});
