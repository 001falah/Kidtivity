document.addEventListener('DOMContentLoaded', function () {
  // Header navigation
  document.getElementById('home-page')?.addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  document.getElementById('cartIcon')?.addEventListener('click', function () {
    window.location.href = 'shop.html';
  });

  document.getElementById('shopLink')?.addEventListener('click', function () {
    window.location.href = 'shop.html';
  });

  document.getElementById('aboutpage')?.addEventListener('click', function () {
    window.location.href = 'about.html';
  });

  document.getElementById('contact')?.addEventListener('click', function () {
    window.location.href = 'contact.html';
  });

  // Footer navigation
  document.getElementById('f-aboutpage')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'about.html';
  });

  document.getElementById('f-contact')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'contact.html';
  });

  document.getElementById('insta')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://www.instagram.com/kidtivitybox?igsh=MXZ4MTZveDNvMjlmaA==', '_blank');
  });

  // Buy buttons
  document.getElementById('buyBtn1')?.addEventListener('click', function () {
    window.location.href = 'checkout1.html';
  });

  document.getElementById('buyBtn2')?.addEventListener('click', function () {
    window.location.href = 'checkout2.html';
  });
});
