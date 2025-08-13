// ----------------- DEVICE DETECTION -----------------
function isMobile() {
  return /iPhone|iPad|iPod|Android|Windows Phone/i.test(navigator.userAgent);
}

// ----------------- HEADER NAVIGATION -----------------

// Home page
document.getElementById('home-page').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'index.html';
});

// Cart icon
document.getElementById('cartIcon').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'shop.html';
});

// Shop link
document.getElementById('shopLink').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'shop.html';
});

// About (header)
document.getElementById('aboutpage').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'about.html';
});

// Contact (header)
document.getElementById('contact').addEventListener('click', function (event) {
  event.preventDefault();
  window.location.href = 'contact.html';
});

// ----------------- FOOTER NAVIGATION -----------------

// About (footer)
document.getElementById("about").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "about.html";
});

// Contact (footer)
document.getElementById("contactFooter").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "contact.html";
});

// Instagram
document.getElementById("insta").addEventListener("click", function (event) {
  event.preventDefault();

  if (isMobile()) {
    // Try opening in Instagram app
    window.location.href = "instagram://user?username=kidtivity.in";

    // Fallback to web after short delay
    setTimeout(() => {
      window.location.href = "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==";
    }, 500);
  } else {
    // Desktop → open in new tab
    window.open(
      "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==",
      "_blank"
    );
  }
});

// WhatsApp
document.getElementById("WhatsApp").addEventListener("click", function (event) {
  event.preventDefault();

  if (isMobile()) {
    // Try opening WhatsApp app
    window.location.href = "whatsapp://chat?code=EF7EZfWWglvGdNbhPoROiI";

    // Fallback to browser group link
    setTimeout(() => {
      window.location.href = "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t";
    }, 500);
  } else {
    // Desktop → open in new tab
    window.open(
      "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t",
      "_blank"
    );
  }
});
