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

    // ✅ WhatsApp link in footer
    document.getElementById('WhatsApp')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(
            'https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t',
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
            let productName = card.querySelector("h3")?.textContent.trim() || "";
            let productImg = card.querySelector("img")?.getAttribute("src") || "";
            let priceText = card.querySelector(".price")?.textContent.trim() || "";
            let price = priceText.replace(/[^\d.]/g, "");

            localStorage.setItem("selectedProduct", JSON.stringify({
                name: productName,
                price: price,
                image: productImg
            }));

            window.location.href = "checkout1.html";
        });
    });
});
