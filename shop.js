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

  // Buy Button
 document.addEventListener('DOMContentLoaded', function () {
  const buyBtn1 = document.getElementById('buyBtn1');
  const buyBtn2 = document.getElementById('buyBtn2');

  if (buyBtn1) {
    buyBtn1.addEventListener('click', function () {
      window.location.href = 'checkout1.html';
    });
  }

  if (buyBtn2) {
    buyBtn2.addEventListener('click', function () {
      window.location.href = 'checkout2.html';
    });
  }
});

