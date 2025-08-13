// ======================
// Helper: Device Detection
// ======================
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ======================
// Helper: Social Link Handler
// ======================
function handleSocialClick(event, url) {
    event.preventDefault();
    if (isMobileDevice()) {
        // On mobile → open directly (letting the app open if installed)
        window.location.href = url;
    } else {
        // On desktop/laptop → open in new tab
        window.open(url, "_blank");
    }
}

// ======================
// HEADER NAVIGATION
// ======================
document.getElementById("home-page").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "index.html";
});

document.getElementById("shopLink").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "shop.html";
});

document.getElementById("aboutpage").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "about.html";
});

// Contact links (header & footer) — share .contact-link class
document.querySelectorAll(".contact-link").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "contact.html";
    });
});

// ======================
// CART ICON
// ======================
document.getElementById("cartIcon").addEventListener("click", function () {
    window.location.href = "shop.html";
});

// ======================
// FOOTER LINKS
// ======================
document.getElementById("about").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "about.html";
});

document.getElementById("insta").addEventListener("click", function (event) {
    handleSocialClick(event, "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==");
});

document.getElementById("WhatsApp").addEventListener("click", function (event) {
    handleSocialClick(event, "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t");
});

// ======================
// CONTACT SOCIAL ICON LINKS
// ======================

// Facebook (placeholder — replace with your real link)
document.getElementById("socialFacebook").addEventListener("click", function(event) {
    handleSocialClick(event, "https://www.facebook.com/");
});

// Twitter (placeholder — replace with your real link)
document.getElementById("socialTwitter").addEventListener("click", function(event) {
    handleSocialClick(event, "https://twitter.com/");
});

// Instagram
document.getElementById("socialInstagram").addEventListener("click", function(event) {
    handleSocialClick(event, "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==");
});

// WhatsApp
document.getElementById("socialWhatsapp").addEventListener("click", function(event) {
    handleSocialClick(event, "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t");
});

