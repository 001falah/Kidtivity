// ======================
// Helper: Device Detection
// ======================
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ======================
// Helper: Social Link Handler
// ======================
function handleSocialClick(event, url) {
    event.preventDefault();
    if (isMobileDevice()) {
        // On mobile → open directly (letting the app open if installed)
        window.location.href = url;
    } else {
        // On desktop/laptop → open in new tab
        window.open(url, "_blank");
    }
}

// ======================
// HEADER NAVIGATION
// ======================
document.getElementById("home-page").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "index.html";
});

document.getElementById("shopLink").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "shop.html";
});

document.getElementById("aboutpage").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "about.html";
});

// Contact links (header & footer) — share .contact-link class
document.querySelectorAll(".contact-link").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "contact.html";
    });
});

// ======================
// CART ICON
// ======================
document.getElementById("cartIcon").addEventListener("click", function () {
    window.location.href = "shop.html";
});

// ======================
// FOOTER LINKS
// ======================
document.getElementById("about").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "about.html";
});

document.getElementById("insta").addEventListener("click", function (event) {
    handleSocialClick(event, "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==");
});

document.getElementById("WhatsApp").addEventListener("click", function (event) {
    handleSocialClick(event, "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t");
});

// ======================
// CONTACT SOCIAL ICON LINKS
// ======================

// Facebook (placeholder — replace with your real link)
document.getElementById("socialFacebook").addEventListener("click", function(event) {
    handleSocialClick(event, "https://www.facebook.com/");
});

// Twitter (placeholder — replace with your real link)
document.getElementById("socialTwitter").addEventListener("click", function(event) {
    handleSocialClick(event, "https://twitter.com/");
});

// Instagram
document.getElementById("socialInstagram").addEventListener("click", function(event) {
    handleSocialClick(event, "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==");
});

// WhatsApp
document.getElementById("socialWhatsapp").addEventListener("click", function(event) {
    handleSocialClick(event, "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t");
});

//Response of the User

const scriptURL = 'https://script.google.com/macros/s/AKfycby5cPC20OWrwY-6hRwJgRN3uXQEaftlXoPc6B59RHfKI0-yDC-YYPQ9SZV78MVOG812/exec';
const form = document.getElementById('gform');
const messageBox = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Show a loading message while sending
  messageBox.style.color = 'blue';
  messageBox.textContent = 'Sending message...';

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      if (response.ok) {
        messageBox.style.color = 'green';
        messageBox.textContent = '✅ Message sent successfully! We will contact you soon.';
        form.reset();
      } else {
        messageBox.style.color = 'red';
        messageBox.textContent = '❌ Failed to send message. Please try again later.';
      }
    })
    .catch(error => {
      messageBox.style.color = 'red';
      messageBox.textContent = '⚠️ Error sending message: ' + error.message;
    });
});

