const form = document.getElementById('gform');

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function () {
  // First check if new unified product data exists
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData && productData.name && productData.image) {
    // Update Order Summary Image & Name
    document.querySelector(".order-prod img").setAttribute("src", productData.image);
    document.querySelector(".order-prod img").setAttribute("alt", productData.name);
    document.querySelector(".order-prod .prod-info b").innerText = productData.name;

    // Update Price in checkout summary
    const subtotalElement = document.querySelector(".order-details .row:nth-child(1) span:last-child");
    const discountElement = document.querySelector(".order-details .row:nth-child(2) span:last-child");
    const totalElement = document.querySelector(".order-details .total span:last-child");

    if (subtotalElement) subtotalElement.textContent = productData.price;
    if (discountElement) discountElement.textContent = "-₹0";
    if (totalElement) totalElement.textContent = productData.price;

    // Hide size/colour
    const prodInfoSpan = document.querySelector(".order-prod .prod-info span");
    if (prodInfoSpan) prodInfoSpan.style.display = "none";
  } else {
    // Fallback to old keys: productName/productImg/productPrice
    let productName = localStorage.getItem("productName");
    let productImg = localStorage.getItem("productImg");
    let productPrice = localStorage.getItem("productPrice");

    if (productName && productImg) {
      const productImageElement = document.querySelector(".order-prod img");
      const productNameElement = document.querySelector(".prod-info b");

      productImageElement.setAttribute("src", productImg);
      productImageElement.setAttribute("alt", productName);
      productNameElement.textContent = productName;
    }

    if (productPrice) {
      // Update the order summary total price display (assuming no discount for simplicity)
      const totalElement = document.querySelector(".order-details .total span:last-child");
      if (totalElement) totalElement.textContent = `₹${productPrice}`;

      const subtotalElement = document.querySelector(".order-details .row:nth-child(1) span:last-child");
      const discountElement = document.querySelector(".order-details .row:nth-child(2) span:last-child");
      if (subtotalElement) subtotalElement.textContent = `₹${productPrice}`;
      if (discountElement) discountElement.textContent = `-₹0`;
    }
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    // Get the total amount dynamically from the order summary
    const totalElement = document.querySelector('.order-details .total span:last-child');
    const amountText = totalElement ? totalElement.textContent.replace(/[^\d.]/g, '') : '0';
    const amount = parseFloat(amountText);

    const upiId = 'falah07mohammed@oksbi'; // Your UPI ID
    const name = 'Kidtivity';               // Your store name

    const gpayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;

    if (isMobile()) {
      // On mobile devices: open Google Pay directly
      window.location.href = gpayUrl;
    } else {
      // On desktops: show QR code popup
      showQRCode(gpayUrl);
    }

    form.reset();
  })
  .catch(() => {
    alert('Something went wrong. Please try again.');
  });
});

function showQRCode(paymentLink) {
  // Create overlay for QR code popup
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

  // QR code container box
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
