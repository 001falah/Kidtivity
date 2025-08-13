// ----------------------
// HEADER NAVIGATION
// ----------------------
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

// Contact links (header & footer) — all share .contact-link class
document.querySelectorAll(".contact-link").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "contact.html";
    });
});

// ----------------------
// CART ICON
// ----------------------
document.getElementById("cartIcon").addEventListener("click", function () {
    window.location.href = "shop.html";
});

// ----------------------
// FOOTER LINKS
// ----------------------
document.getElementById("about").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "about.html";
});

document.getElementById("insta").addEventListener("click", function (event) {
    event.preventDefault();
    window.open("https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==", "_blank");
});

document.getElementById("WhatsApp").addEventListener("click", function (event) {
    event.preventDefault();
    window.open("https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t", "_blank");
});

// ----------------------
// CONTACT SOCIAL ICON LINKS
// ----------------------

// Facebook (placeholder URL for now)
document.getElementById("socialFacebook").addEventListener("click", function(event) {
    event.preventDefault();
    window.open("https://www.facebook.com/", "_blank"); // Replace with your real Facebook link later
});

// Twitter (placeholder URL for now)
document.getElementById("socialTwitter").addEventListener("click", function(event) {
    event.preventDefault();
    window.open("https://twitter.com/", "_blank"); // Replace with your real Twitter link later
});

// Instagram
document.getElementById("socialInstagram").addEventListener("click", function(event) {
    event.preventDefault();
    window.open(
        "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==",
        "_blank"
    );
});

// WhatsApp
document.getElementById("socialWhatsapp").addEventListener("click", function(event) {
    event.preventDefault();
    window.open(
        "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t",
        "_blank"
    );
});

