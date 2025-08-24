document.addEventListener('DOMContentLoaded', function () {
  // ==============================
  // Utility: Detect mobile
  // ==============================
  function isMobile() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
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
  const fContact = document.getElementById('f-contact');
  if (fContact) {
    fContact.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = 'contact.html';
    });
  }

  const fAbout = document.getElementById('f-aboutpage');
  if (fAbout) {
    fAbout.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = 'about.html';
    });
  }

  // ==============================
  // Navigation
  // ==============================
  const homePage = document.getElementById('home-page');
  if (homePage) homePage.addEventListener('click', () => window.location.href = 'index.html');

  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) cartIcon.addEventListener('click', () => window.location.href = 'shop.html');

  const shopLink = document.getElementById('shopLink');
  if (shopLink) shopLink.addEventListener('click', () => window.location.href = 'shop.html');

  const aboutPage = document.getElementById('aboutpage');
  if (aboutPage) aboutPage.addEventListener('click', () => window.location.href = 'about.html');

  const contact = document.getElementById('contact');
  if (contact) contact.addEventListener('click', () => window.location.href = 'contact.html');

  // ==============================
  // Instagram Footer Link
  // ==============================
  const instaBtn = document.getElementById('insta');
  if (instaBtn) {
    instaBtn.addEventListener('click', e => {
      e.preventDefault();
      const instaUsername = 'kidtivity.in';
      const instaWebURL = 'https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==';
      tryOpenApp(`instagram://user?username=${instaUsername}`, instaWebURL);
    });
  }

  // ==============================
  // WhatsApp Footer Link
  // ==============================
  const waBtn = document.getElementById('WhatsApp');
  if (waBtn) {
    waBtn.addEventListener('click', e => {
      e.preventDefault();
      const whatsappWebURL = 'https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t';
      const whatsappAppLink = 'whatsapp://chat?code=EF7EZfWWglvGdNbhPoROiI';
      tryOpenApp(whatsappAppLink, whatsappWebURL);
    });
  }

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

    // Holds the index of the currently unmuted slide
    let unmutedIndex = null;

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

      slides.forEach((slide, idx) => {
        const video = slide.querySelector('video');
        if (video) {
          if (idx >= currentIndex && idx < currentIndex + perView) {
            if (unmutedIndex === idx) {
              video.muted = false;
            } else {
              video.muted = true;
            }
            video.play().catch(() => { });
          } else {
            video.pause();
            video.muted = true;
          }
        }
      });

      slides.forEach((slide, idx) => {
        const button = slide.querySelector('.mute-btn');
        const video = slide.querySelector('video');
        if (button && video) {
          if (idx === unmutedIndex && idx >= currentIndex && idx < currentIndex + perView) {
            button.textContent = '🔊';
          } else {
            button.textContent = '🔈';
          }
        }
      });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    window.addEventListener('resize', () => showSlide(currentIndex));

    // Touch swipe only on mobile
    if (isMobile()) {
      let startX = 0, endX = 0;
      container.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
      container.addEventListener('touchmove', (e) => endX = e.touches[0].clientX);
      container.addEventListener('touchend', () => {
        const diff = startX - endX;
        if (Math.abs(diff) > 30) {
          if (diff > 0) showSlide(currentIndex + 1);
          else showSlide(currentIndex - 1);
        }
      });
    }

    slides.forEach((slide, idx) => {
      const video = slide.querySelector('video');
      const button = slide.querySelector('.mute-btn');
      if (button && video) {
        button.addEventListener('click', () => {
          const perView = slidesPerView();
          // Only allow unmute if slide is visible
          if (idx >= currentIndex && idx < currentIndex + perView) {
            if (video.muted === false) {
              video.muted = true;
              unmutedIndex = null;
              button.textContent = '🔈';
            } else {
              slides.forEach((s, i) => {
                const v = s.querySelector('video');
                const b = s.querySelector('.mute-btn');
                if (v) v.muted = true;
                if (b) b.textContent = '🔈';
              });
              video.muted = false;
              unmutedIndex = idx;
              button.textContent = '🔊';
            }
          }
        });
      }
    });

    showSlide(currentIndex);
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

    if (leftBtn) leftBtn.addEventListener("click", () => updateCrewCarousel(crewIndex - 1));
    if (rightBtn) rightBtn.addEventListener("click", () => updateCrewCarousel(crewIndex + 1));

    crewCards.forEach((card, i) => {
      card.addEventListener("click", () => updateCrewCarousel(i));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
      else if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
    });

    if (isMobile()) {
      const crewContainer = document.querySelector('.crew-hero');
      let startX = 0, endX = 0;
      if (crewContainer) {
        crewContainer.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        crewContainer.addEventListener('touchmove', e => endX = e.touches[0].clientX);
        crewContainer.addEventListener('touchend', () => {
          const diff = startX - endX;
          if (Math.abs(diff) > 30) {
            if (diff > 0) updateCrewCarousel(crewIndex + 1);
            else updateCrewCarousel(crewIndex - 1);
          }
        });
      }
    }

    updateCrewCarousel(0);
  })();

});

