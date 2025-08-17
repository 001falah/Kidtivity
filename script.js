document.addEventListener('DOMContentLoaded', function () {

  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function tryOpenApp(deepLink, webURL) {
    if (isMobile()) {
      let openedApp = false;

      function onVisibilityChange() {
        if (document.hidden) {
          openedApp = true;
          document.removeEventListener('visibilitychange', onVisibilityChange);
        }
      }

      document.addEventListener('visibilitychange', onVisibilityChange);

      // Try to open app
      window.location.href = deepLink;

      // Only fallback if app was NOT opened
      setTimeout(() => {
        if (!openedApp) {
          window.location.href = webURL;
        }
      }, 800); // shorter delay to reduce double open
    } else {
      window.location.href = webURL; // desktop always open in same tab
    }
  }

  // ==============================
  // Footer Links
  // ==============================
  document.getElementById('f-contact').addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'contact.html';
  });

  document.getElementById('f-aboutpage').addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'about.html';
  });

  // ==============================
  // Navigation
  // ==============================
  document.getElementById('home-page').addEventListener('click', () => window.location.href = 'index.html');
  document.getElementById('cartIcon').addEventListener('click', () => window.location.href = 'shop.html');
  document.getElementById('shopLink').addEventListener('click', () => window.location.href = 'shop.html');
  document.getElementById('aboutpage').addEventListener('click', () => window.location.href = 'about.html');
  document.getElementById('contact').addEventListener('click', () => window.location.href = 'contact.html');

  // ==============================
  // Instagram Footer Link
  // ==============================
  document.getElementById('insta').addEventListener('click', e => {
    e.preventDefault();
    const instaUsername = 'kidtivity.in';
    const instaWebURL = 'https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==';
    tryOpenApp(`instagram://user?username=${instaUsername}`, instaWebURL);
  });

  // ==============================
  // WhatsApp Footer Link
  // ==============================
  document.getElementById('WhatsApp').addEventListener('click', e => {
    e.preventDefault();
    const whatsappWebURL = 'https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t';
    const whatsappAppLink = 'whatsapp://chat?code=EF7EZfWWglvGdNbhPoROiI';
    tryOpenApp(whatsappAppLink, whatsappWebURL);
  });

  // ==============================
  // Join Us Button
  // ==============================
  const joinUsBtn = document.getElementById('joinUsBtn');
  if (joinUsBtn) {
    joinUsBtn.addEventListener('click', () => {
      const whatsappWebURL = 'https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t';
      const whatsappAppLink = 'whatsapp://chat?code=EF7EZfWWglvGdNbhPoROiI';
      tryOpenApp(whatsappAppLink, whatsappWebURL);
    });
  }

  // ==============================
  // Watch Video Button
  // ==============================
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', () => {
      const videoWebURL = 'https://www.instagram.com/reel/CsDXGeWLpff/?igsh=MXNjdjlhODhvd212MA==';
      // This deep link format works better across devices
      const deepLink = 'instagram://reel/CsDXGeWLpff';
      tryOpenApp(deepLink, videoWebURL);
    });
  }

  // ==============================
  // Buy Buttons
  // ==============================
  document.querySelectorAll(".shop-section .shop-item .buy-btn").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".shop-item");
      const productName = card.querySelector("h3").innerText.trim();
      const productPrice = card.querySelector(".price").innerText.trim();
      const productImage = card.querySelector(".shop-img").getAttribute("src");
      const productDescription = card.querySelector("#description").innerText.trim();

      localStorage.setItem("selectedProduct", JSON.stringify({
        name: productName,
        price: productPrice,
        image: productImage,
        description: productDescription
      }));

      window.location.href = "checkout1.html";
    });
  });

});



// ==============================
// Multi-card carousel logic
// ==============================
const slides = document.querySelectorAll('.carousel-slide');
const container = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

// Calculate how many slides fit in viewport
function slidesPerView() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1024) return 3;
  return 4;  // default desktop
}

function showSlide(index) {
  const perView = slidesPerView();
  const maxIndex = slides.length - perView; 

  if (index > maxIndex) index = 0;       // loop back
  if (index < 0) index = maxIndex;       // loop to end

  currentIndex = index;
  const offset = -(100 / perView) * currentIndex;
  container.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
setInterval(() => showSlide(currentIndex + 1), 5000);

