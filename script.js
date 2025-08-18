document.addEventListener('DOMContentLoaded', function () {
  // ==============================
  // Utility: Detect mobile
  // ==============================
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

      // Try app
      window.location.href = deepLink;

      setTimeout(() => {
        if (!openedApp) {
          window.location.href = webURL;
        }
      }, 800);
    } else {
      window.location.href = webURL;
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

  // ==============================
  // Multi-card Video Carousel ("Explore what's in the box")
  // ==============================
  (function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const container = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function slidesPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function showSlide(index) {
      const perView = slidesPerView();
      const maxIndex = slides.length - perView;

      if (index > maxIndex) index = 0;
      if (index < 0) index = maxIndex;

      currentIndex = index;
      const offset = -(100 / perView) * currentIndex;
      container.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    window.addEventListener('resize', () => showSlide(currentIndex));

    // Video mute/unmute for this carousel
    document.querySelectorAll('.carousel-slide').forEach(slide => {
      const video = slide.querySelector('video');
      const button = slide.querySelector('.mute-btn');

      button.addEventListener('click', () => {
        if (video.muted) {
          document.querySelectorAll('.carousel-slide video').forEach(v => v.muted = true);
          video.muted = false;
          button.textContent = '🔊';
        } else {
          video.muted = true;
          button.textContent = '🔈';
        }
      });
    });

    showSlide(currentIndex);
    setInterval(() => showSlide(currentIndex + 1), 5000);
  })();

  // ==============================
  // Hero Crew Carousel
  // ==============================
  (function () {
    const crewCards = document.querySelectorAll('.crew-hero .crew-card');
    const leftBtn = document.querySelector('.crew-hero .crew-left');
    const rightBtn = document.querySelector('.crew-hero .crew-right');
    let crewIndex = 0;
    let crewAnimating = false;

    function updateCrewCarousel(newIndex) {
      if (crewAnimating) return;
      crewAnimating = true;
      crewIndex = (newIndex + crewCards.length) % crewCards.length;

      crewCards.forEach((card, i) => {
        const offset = (i - crewIndex + crewCards.length) % crewCards.length;
        card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

        if (offset === 0) card.classList.add("center");
        else if (offset === 1) card.classList.add("right-1");
        else if (offset === 2) card.classList.add("right-2");
        else if (offset === crewCards.length - 1) card.classList.add("left-1");
        else if (offset === crewCards.length - 2) card.classList.add("left-2");
        else card.classList.add("hidden");
      });

      setTimeout(() => {
        crewAnimating = false;
      }, 400);
    }

    leftBtn.addEventListener("click", () => updateCrewCarousel(crewIndex - 1));
    rightBtn.addEventListener("click", () => updateCrewCarousel(crewIndex + 1));

    crewCards.forEach((card, i) => {
      card.addEventListener("click", () => updateCrewCarousel(i));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
      else if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
    });

    updateCrewCarousel(0);
  })();

});

