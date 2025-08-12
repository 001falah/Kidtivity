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

        if (!buyBtn) return; // safety check

        buyBtn.addEventListener("click", function () {
            // Get Product Data
            let productName = card.querySelector("h3")?.textContent.trim() || "";
            let productImg = card.querySelector("img")?.getAttribute("src") || "";
            let priceText = card.querySelector(".price")?.textContent.trim() || "";

            // Remove currency symbols and keep only digits/decimal
            let price = priceText.replace(/[^\d.]/g, "");

            // Store in localStorage (single object for easy retrieval)
            localStorage.setItem("selectedProduct", JSON.stringify({
                name: productName,
                price: price,
                image: productImg
            }));

            // Go to checkout page
            window.location.href = "checkout1.html";
        });
    });
});
