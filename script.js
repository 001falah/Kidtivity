document.addEventListener('DOMContentLoaded', function () {
  
  // Footer
  document.getElementById('f-contact').addEventListener('click', function(e) {
    e.preventDefault(); // prevent empty link jumping to top
    window.location.href = 'contact.html';
  });

  document.getElementById('f-aboutpage').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'about.html';
  });

  // Nav
  document.getElementById('home-page').addEventListener('click', function(){
    window.location.href = 'index.html';
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

  document.getElementById('insta').addEventListener('click', function(){
    window.open('https://www.instagram.com/kidtivitybox?igsh=MXZ4MTZveDNvMjlmaA==', '_blank');
  });

  // Shop Section
  /*document.querySelectorAll('.shop-item').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      if (url) window.location.href = url;
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const url = card.getAttribute('data-url');
        if (url) window.location.href = url;
      }
    });
  });*/

  // Join Us Button
  const joinUsBtn = document.getElementById('joinUsBtn');
  if (joinUsBtn) {
    joinUsBtn.addEventListener('click', function () {
      const whatsappCommunityLink = 'https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t';
      window.open(whatsappCommunityLink, '_blank');
    });
  }

  // Watch Video Button
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', function () {
      const videoLink = 'https://www.instagram.com/reel/CsDXGeWLpff/?igsh=MTkzdDcxcGxuaTVlaQ==';
      window.open(videoLink, '_blank');
    });
  }

});

// Buy Button

document.addEventListener("DOMContentLoaded", function () {
    // First product Buy Now button
    const firstBuyBtn = document.querySelector(".shop-section .shop-item:first-child .buy-btn");
    if (firstBuyBtn) {
        firstBuyBtn.addEventListener("click", function () {
            window.location.href = "checkout1.html";
        });
    }

    // Second product Buy Now button
    const secondBuyBtn = document.querySelector(".shop-section .shop-item:nth-child(2) .buy-btn");
    if (secondBuyBtn) {
        secondBuyBtn.addEventListener("click", function () {
            window.location.href = "checkout2.html";
        });
    }
});


