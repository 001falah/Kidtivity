// Reference to form and message container
const form = document.getElementById('gform');
const formStatusMessage = document.getElementById('formStatusMessage');

// Google Apps Script Web App URL
const googleScriptURL = "https://script.google.com/macros/s/AKfycbyeiPdjyVdyVaZzuZnHodbMWX3QSLuuHu5lI2nZR2PPoe-WOKIxQRm6xicEFBDPW7Vd-A/exec";

// Check if device is mobile
function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ----------------------------
// Prefill order summary from localStorage + Calculate Total
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData && productData.name && productData.image) {
    document.querySelector(".order-prod img").src = productData.image;
    document.querySelector(".order-prod img").alt = productData.name;
    document.querySelector(".order-prod .prod-info b").innerText = productData.name;

    if (productData.description) {
      document.querySelector(".order-prod .prod-info span").innerText = productData.description;
    }

    // Define discount as percentage
    const discountPercent = 10; // Example: 10% discount
    const shippingCharge = 40;  // Example: ₹40 shipping fee

    // Clean and parse price to number
    const subtotal = parseFloat(String(productData.price).replace(/[₹,]/g, "")) || 0;

    // Calculate discount amount as percentage of subtotal
    const discountValue = (discountPercent / 100) * subtotal;

    // Set amounts in the UI
    document.getElementById("subtotalAmount").textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById("discountAmount").textContent = `${discountPercent}%`;
    document.getElementById("shippingAmount").textContent = `₹${shippingCharge.toFixed(2)}`;

    // Calculate final total: subtotal - discount + shipping
    const calculatedTotal = subtotal - discountValue + shippingCharge;

    document.getElementById("totalAmount").textContent = `₹${calculatedTotal.toFixed(2)}`;

    console.log(`Subtotal: ₹${subtotal}`);
    console.log(`Discount (${discountPercent}%): ₹${discountValue}`);
    console.log(`Shipping: ₹${shippingCharge}`);
    console.log(`Total: ₹${calculatedTotal}`);
  }
});

// ----------------------------
// Handle checkout form submission
// ----------------------------
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Show loading message while sending
  formStatusMessage.style.color = 'blue';
  formStatusMessage.textContent = '⏳ Sending message, please wait...';

  // Get product details from the order summary
  const productName = document.querySelector(".order-prod .prod-info b").innerText;
  const amountText = document.getElementById("totalAmount").textContent.replace(/[^\d.]/g, '');
  const amount = parseFloat(amountText) || 0;

  // Fill hidden fields
  document.getElementById("productName").value = productName;
  document.getElementById("amount").value = amount;

  // Prepare form data to send to Google Sheet
  const formData = new FormData(form);

  // Send data to Google Sheet
  fetch(googleScriptURL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' // no-cors used since Google Apps Script web app does not support CORS preflight
  })
  .then(() => {
    formStatusMessage.style.color = '#ffc107';
    formStatusMessage.textContent = '✅  Please proceed with the payment. After payment fill the Transaction Id below';

    const upiId = 'falah07mohammed@oksbi';
    const name = 'Kidtivity';
    const gpayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;

    if (isMobile()) {
      // On mobile, redirect to UPI app
      window.location.href = gpayUrl;
    } else {
      // On desktop, show QR code popup
      showQRCode(gpayUrl);
    }

    // Show payment confirmation section
    document.getElementById("payment-confirm-section").style.display = "block";
  })
  .catch(() => {
    formStatusMessage.style.color = 'red';
    formStatusMessage.textContent = '❌ Something went wrong. Please try again .';
  });
});

// ----------------------------
// Handle confirm payment button
// ----------------------------
document.getElementById("confirmPaymentBtn").addEventListener("click", function () {
  const txnId = document.getElementById("txnId").value.trim();

  if (!txnId) {
    formStatusMessage.style.color = 'red';
    formStatusMessage.textContent = '⚠️ Please enter your UPI Transaction ID before confirming payment.';
    return;
  }

  // Store this in hidden field
  document.getElementById("transactionId").value = txnId;

  // Create form data again with UPI Transaction ID
  const formData = new FormData(form);

  formStatusMessage.style.color = 'blue';
  formStatusMessage.textContent = '⏳ Verifying payment, please wait...';

  fetch(googleScriptURL, {
    method: "POST",
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    formStatusMessage.style.color = '#ffc107';
    formStatusMessage.textContent = '✅ Payment verified and recorded successfully! Thank you for your order.';
    document.getElementById("payment-confirm-section").style.display = "none";
    form.reset();
  })
  .catch(() => {
    formStatusMessage.style.color = 'red';
    formStatusMessage.textContent = '❌ Error verifying payment. Please try again.';
  });
});

// ----------------------------
// Show QR popup for desktop
// ----------------------------
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

// ----------------------------
// Navigation redirects
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {
  // HEADER LINKS
  document.getElementById("homepage").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
  });

  document.getElementById("shopLink").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "shop.html";
  });

  document.getElementById("aboutpage").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "about.html";
  });

  document.querySelector("header #contact").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "contact.html";
  });

  // FOOTER LINKS
  document.getElementById("about").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "about.html";
  });

  document.querySelector("footer #contact").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "contact.html";
  });

  document.getElementById("insta").addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==", "_blank");
  });

  document.getElementById("WhatsApp").addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t", "_blank");
  });
});
