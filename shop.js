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
document.getElementById('buyBtn1').addEventListener('click',function(){
  window.location.href = 'checkout1.html'
});