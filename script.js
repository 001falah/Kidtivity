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

  // ============================================
  // Buy Buttons for BOTH Home Page & Shop Page
  // ============================================

  // Home Page cards: .shop-item
  document.querySelectorAll(".shop-section .shop-item .buy-btn").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".shop-item");
      const productName = card.querySelector("h3").innerText.trim();
      const productPrice = card.querySelector(".price").innerText.trim();
      const productImage = card.querySelector(".shop-img").getAttribute("src");

      localStorage.setItem("selectedProduct", JSON.stringify({
        name: productName,
        price: productPrice,
        image: productImage
      }));

      window.location.href = "checkout1.html";
    });
  });
  });

