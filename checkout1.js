// Form reference
const form = document.getElementById('gform');

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Prefill order summary from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData && productData.name && productData.image) {
    // Image & name
    document.querySelector(".order-prod img").src = productData.image;
    document.querySelector(".order-prod img").alt = productData.name;
    document.querySelector(".order-prod .prod-info b").innerText = productData.name;

    // ✅ Set description if available
    if (productData.description) {
      document.querySelector(".order-prod .prod-info span").innerText = productData.description;
    }

    // Pricing
    const subtotalElement = document.querySelector(".order-details .row:nth-child(1) span:last-child");
    const discountElement = document.querySelector(".order-details .row:nth-child(2) span:last-child");
    const totalElement = document.querySelector(".order-details .total span:last-child");

    if (subtotalElement) subtotalElement.textContent = `₹${productData.price}`;
    if (discountElement) discountElement.textContent = "-₹0";
    if (totalElement) totalElement.textContent = `₹${productData.price}`;
  }
});

// Handle checkout form submission
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(form);

  // 1. Save order to backend
  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    // 2. Payment link
    const totalElement = document.querySelector('.order-details .total span:last-child');
    const amountText = totalElement ? totalElement.textContent.replace(/[^\d.]/g, '') : '0';
    const amount = parseFloat(amountText) || 0;

    const upiId = 'falah07mohammed@oksbi';
    const name = 'Kidtivity';
    const gpayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;

    // 3. Payment prompt
    if (isMobile()) {
      alert("Please complete your payment and then confirm it below.");
      window.location.href = gpayUrl;
    } else {
      showQRCode(gpayUrl);
      alert("Please scan and pay, then confirm your payment below.");
    }

    // 4. Reset form & show Confirm Payment
    form.reset();
    document.getElementById("payment-confirm-section").style.display = "block";
  })
  .catch(() => {
    alert('Something went wrong. Please try again to place your order.');
  });
});

// Handle confirm payment button
document.getElementById("confirmPaymentBtn").addEventListener("click", function () {
  const txnId = document.getElementById("txnId").value.trim();
  if (!txnId) {
    alert("Please enter your UPI Transaction ID.");
    return;
  }

  fetch("verify_payment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transactionId: txnId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      alert("✅ Payment verified! Your order has been placed successfully.");
      document.getElementById("payment-confirm-section").style.display = "none";
    } else {
      alert("❌ Payment not found or not yet received. Please wait a few minutes or try again.");
    }
  })
  .catch(() => {
    alert("Error verifying payment. Please try again.");
  });
});

// Show QR popup for desktop
function showQRCode(paymentLink) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.8)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';

  const qrBox = document.createElement('div');
  qrBox.style.background = '#fff';
  qrBox.style.padding = '20px';
  qrBox.style.borderRadius = '10px';
  qrBox.style.textAlign = 'center';

  const title = document.createElement('h3');
  title.innerText = 'Scan to Pay with Google Pay';
  qrBox.appendChild(title);

  const qrImage = document.createElement('img');
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(paymentLink)}`;
  qrImage.alt = 'Google Pay QR Code';
  qrBox.appendChild(qrImage);

  const closeBtn = document.createElement('button');
  closeBtn.innerText = 'Close';
  closeBtn.style.marginTop = '15px';
  closeBtn.onclick = () => document.body.removeChild(overlay);
  qrBox.appendChild(closeBtn);

  overlay.appendChild(qrBox);
  document.body.appendChild(overlay);
}

