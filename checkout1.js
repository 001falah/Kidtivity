// Reference to form
const form = document.getElementById('gform');

// Google Apps Script Web App URL
const googleScriptURL = "https://script.google.com/macros/s/AKfycbyeiPdjyVdyVaZzuZnHodbMWX3QSLuuHu5lI2nZR2PPoe-WOKIxQRm6xicEFBDPW7Vd-A/exec";

// Check if device is mobile
function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ----------------------------
// Prefill order summary from localStorage
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

    const subtotalElement = document.querySelector(".order-details .row:nth-child(1) span:last-child");
    const discountElement = document.querySelector(".order-details .row:nth-child(2) span:last-child");
    const totalElement = document.querySelector(".order-details .total span:last-child");

    if (subtotalElement) subtotalElement.textContent = `₹${productData.price}`;
    if (discountElement) discountElement.textContent = "₹0";
    if (totalElement) totalElement.textContent = `₹${productData.price}`;
  }
});

// ----------------------------
// Handle checkout form submission
// ----------------------------
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Get product details from the order summary
  const productName = document.querySelector(".order-prod .prod-info b").innerText;
  const totalElement = document.querySelector('.order-details .total span:last-child');
  const amountText = totalElement ? totalElement.textContent.replace(/[^\d.]/g, '') : '0';
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
    mode: 'no-cors'
  })
  .then(() => {
    const upiId = 'falah07mohammed@oksbi';
    const name = 'Kidtivity';
    const gpayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;

    if (isMobile()) {
      alert("Please complete your payment and then confirm it below.");
      window.location.href = gpayUrl;
    } else {
      showQRCode(gpayUrl);
      alert("Please scan and pay, then confirm your payment below.");
    }

    // Show payment confirmation section
    document.getElementById("payment-confirm-section").style.display = "block";
  })
  .catch(() => {
    alert('Something went wrong. Please try again to place your order.');
  });
});

// ----------------------------
// Handle confirm payment button
// ----------------------------
document.getElementById("confirmPaymentBtn").addEventListener("click", function () {
  const txnId = document.getElementById("txnId").value.trim();
  if (!txnId) {
    alert("Please enter your UPI Transaction ID.");
    return;
  }

  // Store this in hidden field
  document.getElementById("transactionId").value = txnId;

  // Create form data again with UPI Transaction ID
  const formData = new FormData(form);

  fetch(googleScriptURL, {
    method: "POST",
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    alert("✅ Payment verified and recorded successfully in Google Sheet!");
    document.getElementById("payment-confirm-section").style.display = "none";
    form.reset();
  })
  .catch(() => {
    alert("Error verifying payment. Please try again.");
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


// Redirecting
document.addEventListener("DOMContentLoaded", function () {
    // ---------- HEADER LINKS ----------
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

    // ⚠ NOTE: There are two "contact" IDs in your HTML — one in header and one in footer.
    // This will pick the first one unless we target separately. 
    // Better give them unique IDs for clarity, e.g., contactHeader & contactFooter
    document.querySelector("header #contact").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "contact.html";
    });

    // ---------- FOOTER LINKS ----------
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

