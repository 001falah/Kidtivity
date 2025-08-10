
 /* const form = document.getElementById('gform');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submit
    
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // since Google Apps Script doesn't send CORS headers by default
    }).then(() => {
      alert('Your order is successful!');
      form.reset();
    }).catch(() => {
      alert('Something went wrong. Please try again.');
    });
  });*/

  const form = document.getElementById('gform');

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    // Get the amount dynamically from your page
    const totalElement = document.querySelector('.order-details .total span:last-child');
    const amountText = totalElement ? totalElement.textContent.replace(/[^\d.]/g, '') : '0';
    const amount = parseFloat(amountText);

    const upiId = 'falah07mohammed@oksbi'; // Replace with your UPI ID
    const name = 'Kidtivity';     // Your store name

    const gpayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;

    if (isMobile()) {
      // Mobile → Directly open GPay
      window.location.href = gpayUrl;
    } else {
      // Desktop → Show QR code
      showQRCode(gpayUrl);
    }

    form.reset();
  })
  .catch(() => {
    alert('Something went wrong. Please try again.');
  });
});

function showQRCode(paymentLink) {
  // Create a popup container
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

  // QR code container
  const qrBox = document.createElement('div');
  qrBox.style.background = '#fff';
  qrBox.style.padding = '20px';
  qrBox.style.borderRadius = '10px';
  qrBox.style.textAlign = 'center';

  const title = document.createElement('h3');
  title.innerText = 'Scan to Pay with Google Pay';
  qrBox.appendChild(title);

  // QR image
  const qrImage = document.createElement('img');
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(paymentLink)}`;
  qrImage.alt = 'Google Pay QR Code';
  qrBox.appendChild(qrImage);

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.innerText = 'Close';
  closeBtn.style.marginTop = '15px';
  closeBtn.onclick = () => document.body.removeChild(overlay);
  qrBox.appendChild(closeBtn);

  overlay.appendChild(qrBox);
  document.body.appendChild(overlay);
}

