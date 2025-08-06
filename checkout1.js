// Delivery method toggle buttons
const deliveryBtn = document.getElementById('deliveryBtn');
const storeBtn = document.getElementById('storeBtn');

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

// Checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
  e.preventDefault();

  if (!document.getElementById('agree').checked) {
    alert('You must accept the terms to proceed.');
    return;
  }

  // Form validation passed - do your order processing here
  alert("Thank you for your order!\nWe'll confirm your order soon.");

  // Redirect or reset form
  window.location.href = 'index.html'; // Change as needed
});
