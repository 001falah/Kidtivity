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

// Instagram - open in new tab
document.getElementById("insta").addEventListener("click", function (event) {
  event.preventDefault();
  window.open(
    "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==",
    "_blank"
  );
});

// WhatsApp - open in new tab
document.getElementById("WhatsApp").addEventListener("click", function (event) {
  event.preventDefault();
  window.open(
    "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t",
    "_blank"
  );
});
