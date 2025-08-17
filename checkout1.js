// Reference to form and message container
const form = document.getElementById('gform');
const formStatusMessage = document.getElementById('formStatusMessage');

// Google Apps Script Web App URL
const googleScriptURL = "https://script.google.com/macros/s/AKfycbyeiPdjyVdyVaZzuZnHodbMWX3QSLuuHu5lI2nZR2PPoe-WOKIxQRm6xicEFBDPW7Vd-A/exec";

// Check if device is mobile
function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Detect iOS specifically
function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
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

        const discountPercent = 10;
        const shippingCharge = 40;

        const subtotal = parseFloat(String(productData.price).replace(/[₹,]/g, "")) || 0;
        const discountValue = (discountPercent / 100) * subtotal;

        document.getElementById("subtotalAmount").textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById("discountAmount").textContent = `${discountPercent}%`;
        document.getElementById("shippingAmount").textContent = `₹${shippingCharge.toFixed(2)}`;

        const calculatedTotal = subtotal - discountValue + shippingCharge;
        document.getElementById("totalAmount").textContent = `₹${calculatedTotal.toFixed(2)}`;
    }
});

// ----------------------------
// Handle checkout form submission
// ----------------------------
form.addEventListener('submit', function (event) {
    event.preventDefault();

    formStatusMessage.style.color = 'green';
    formStatusMessage.textContent = '⏳ Processing, please wait...';

    const productName = document.querySelector(".order-prod .prod-info b").innerText;
    const amountText = document.getElementById("totalAmount").textContent.replace(/[^\d.]/g, '');
    const amount = parseFloat(amountText) || 0;

    document.getElementById("productName").value = productName;
    document.getElementById("amount").value = amount;

    const formData = new FormData(form);

    fetch(googleScriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
    .then(() => {
        formStatusMessage.style.color = '#ffc107';
        formStatusMessage.textContent = '✅ Please proceed with the payment. After payment fill the Transaction Id below';

        const upiId = 'falah07mohammed@oksbi';
        const name = 'Kidtivity';
        
        // Force GPay scheme for iOS
        let gpayUrl;
        if (isIOS()) {
            // iOS-specific Google Pay scheme
            gpayUrl = `gpay://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;
        } else {
            // Works for Android/other platforms
            gpayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;
        }

        // Debugging: show which URL is used
        console.log("Redirecting to:", gpayUrl);

        if (isMobile()) {
            window.location.href = gpayUrl;
        } else {
            showQRCode(gpayUrl);
        }

        document.getElementById("payment-confirm-section").style.display = "block";
    })
    .catch(() => {
        formStatusMessage.style.color = 'red';
        formStatusMessage.textContent = '❌ Something went wrong. Please try again.';
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

    document.getElementById("transactionId").value = txnId;

    const formData = new FormData(form);

    formStatusMessage.style.color = 'green';
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
        localStorage.removeItem("selectedProduct");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
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

// Header Navigation
document.addEventListener("DOMContentLoaded", function () {
  // Grab elements
  const homeLink = document.getElementById("home-page");
  const shopLink = document.getElementById("shopLink");
  const aboutLink = document.getElementById("aboutpage");
  const contactLink = document.getElementById("contact");

  // Add click events
  homeLink.addEventListener("click", function (e) {
    e.preventDefault(); // stop "#" from reloading page
    window.location.href = "index.html";
  });

  shopLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "shop.html";
  });

  aboutLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "about.html";
  });

  contactLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "contact.html";
  });
});

// Footer 
document.addEventListener("DOMContentLoaded", function () {
  // Footer links
  const aboutFooter = document.getElementById("about");
  const contactFooter = document.getElementById("contact");
  const instaFooter = document.getElementById("insta");
  const whatsappFooter = document.getElementById("whatsapp");

  // About Page
  aboutFooter.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "about.html";
  });

  // Contact Page
  contactFooter.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "contact.html";
  });

  // Instagram Link 
  instaFooter.addEventListener("click", function (e) {
    e.preventDefault();
    window.open("instagram://user?username=kidtivity.in", "_blank");
  });

  // WhatsApp Link 
  whatsappFooter.addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t", "_blank"); 
  });
});
