  //Nav Bar
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
  
//Footer
document.getElementById('f-contact').addEventListener('click',function(){
  window.location.href = 'contact.html'
});

  document.getElementById('f-aboutpage').addEventListener('click', function() {
    window.location.href = 'about.html';
  });

  // instagram 
document.getElementById('insta').addEventListener('click',function(){
  window.open('https://www.instagram.com/kidtivitybox?igsh=MXZ4MTZveDNvMjlmaA==','_blank');
});


  //Shop Section 
  document.querySelectorAll('.shop-item').forEach(card => {
  // Click event to navigate on mouse click
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-url');
    if (url) window.location.href = url;
  });

  // Keyboard accessibility: Enter and Space keys
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent page scroll on Space
      const url = card.getAttribute('data-url');
      if (url) window.location.href = url;
    }
  });
});

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
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


