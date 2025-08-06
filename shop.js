  //Home page
  document.getElementById('home-page').addEventListener('click',function(){
    window.location.href = 'index.html'
  });
  
  document.getElementById('cartIcon').addEventListener('click', function() {
    window.location.href = 'shop.html';
  });

    document.getElementById('shopLink').addEventListener('click', function() {
    window.location.href = 'shop.html';
  });

    document.getElementById('aboutpage').addEventListener('click', function() {
    window.location.href = 'about.html';
  });

    document.getElementById('contact').addEventListener('click', function() {
    window.location.href = 'contact.html';
  });

  // instagram 
document.getElementById('insta').addEventListener('click',function(){
  window.open('https://www.instagram.com/kidtivitybox?igsh=MXZ4MTZveDNvMjlmaA==');
});

// Buy button
document.querySelectorAll('.buyBtn').forEach(function(button) {
  button.addEventListener('click', function() {
    const checkoutPage = this.getAttribute('data-checkout');
    window.location.href = checkoutPage;
  });
});
