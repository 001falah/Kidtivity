document.addEventListener('DOMContentLoaded', function () {

  // Utility: Detect mobile devices
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  // Utility: Try open deep link, fallback only if app not installed
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

      window.location.href = deepLink;

      setTimeout(() => {
        if (!openedApp) {
          window.location.href = webURL;
        }
      }, 1000);
    } else {
      window.open(webURL, '_blank');
    }
  }

  // ==============================
  // Footer links
  // ==============================
  document.getElementById('f-contact').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'contact.html';
  });

  document.getElementById('f-aboutpage').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'about.html';
  });

  // ==============================
  // Navigation links
  // ==============================
  document.getElementById('home-page').addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  document.getElementById('cartIcon').addEventListener('click', function () {
    window.location.href = 'shop.html';
  });

  document.getElementById('shopLink').addEventListener('click', function () {
    window.location.href = 'shop.html';
  });

  document.getElementById('aboutpage').addEventListener('click', function () {
    window.location.href = 'about.html';
  });

  document.getElementById('contact').addEventListener('click', function () {
    window.location.href = 'contact.html';
  });

  // ==============================
  // Instagram footer link
  // ==============================
  document.getElementById('insta').addEventListener('click', function () {
    const instaUsername = 'kidtivity.in';
    const instaWebURL = 'https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==';
    tryOpenApp(`instagram://user?username=${instaUsername}`, instaWebURL);
  });

  // ==============================
  // WhatsApp footer link
  // ==============================
  document.getElementById('WhatsApp').addEventListener('click', function (e) {
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
    joinUsBtn.addEventListener('click', function () {
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
    watchVideoBtn.addEventListener('click', function () {
      const videoWebURL = 'https://www.instagram.com/reel/CsDXGeWLpff/?igsh=MXNjdjlhODhvd212MA==';
      const deepLink = 'instagram://reel/CsDXGeWLpff';
      tryOpenApp(deepLink, videoWebURL);
    });
  }

  // ==============================
  // Buy Buttons (Home & Shop pages)
  // ==============================
  document.querySelectorAll(".shop-section .shop-item .buy-btn").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".shop-item");
      const productName = card.querySelector("h3").innerText.trim();
      const productPrice = card.querySelector(".price").innerText.trim();
      const productImage = card.querySelector(".shop-img").getAttribute("src");
      const productDescription = card.querySelector("#description").innerText.trim();

      // Save all details to localStorage
      localStorage.setItem("selectedProduct", JSON.stringify({
        name: productName,
        price: productPrice,
        image: productImage,
        description: productDescription
      }));

      // Go to checkout
      window.location.href = "checkout1.html";
    });
  });

});

