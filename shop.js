// shop.js
document.addEventListener("DOMContentLoaded", function () {
    /* ------------------------------
       Header Navigation
    ------------------------------ */
    document.getElementById('home-page')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('cartIcon')?.addEventListener('click', () => {
        window.location.href = 'shop.html';
    });

    document.getElementById('shopLink')?.addEventListener('click', () => {
        window.location.href = 'shop.html';
    });

    document.getElementById('aboutpage')?.addEventListener('click', () => {
        window.location.href = 'about.html';
    });

    document.getElementById('contact')?.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });

    /* ------------------------------
       Footer Navigation
    ------------------------------ */
    document.getElementById('f-aboutpage')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'about.html';
    });

    document.getElementById('f-contact')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'contact.html';
    });

    document.getElementById('insta')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(
            'https://www.instagram.com/kidtivitybox?igsh=MXZ4MTZveDNvMjlmaA==',
            '_blank'
        );
    });

    /* ------------------------------
       BUY NOW Buttons — Dynamic Product Transfer
    ------------------------------ */
    document.querySelectorAll(".simple-card").forEach(card => {
        let buyBtn = card.querySelector("button");

        buyBtn.addEventListener("click", function () {
            // Get Product Name and Image
            let productName = card.querySelector("h3").textContent.trim();
            let productImg = card.querySelector("img").getAttribute("src");

            // Store in localStorage
            localStorage.setItem("productName", productName);
            localStorage.setItem("productImg", productImg);

            // Go to checkout page
            window.location.href = "checkout1.html";
        });
    });
});


// taking the cards Price
// shop.js
document.addEventListener("DOMContentLoaded", function () {
    // ... existing header and footer nav code ...

    // Handle Buy Buttons for All Cards
    document.querySelectorAll(".simple-card").forEach(card => {
        let buyBtn = card.querySelector("button");

        buyBtn.addEventListener("click", function () {
            let productName = card.querySelector("h3").textContent.trim();
            let productImg = card.querySelector("img").getAttribute("src");

            // Get price text, e.g. "₹3999"
            let priceText = card.querySelector(".price").textContent.trim();
            // Remove non-digit characters, keep decimal if any, and convert to number
            let price = priceText.replace(/[^\d.]/g, "");

            localStorage.setItem("productName", productName);
            localStorage.setItem("productImg", productImg);
            localStorage.setItem("productPrice", price);

            window.location.href = "checkout1.html";
        });
    });
});
