document.addEventListener("DOMContentLoaded", function () {
    /* ------------------------------
       Function: Detect Mobile Device
    ------------------------------ */
    function isMobile() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

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

    /* ------------------------------
       Instagram Link (Footer)
    ------------------------------ */
    document.getElementById('insta')?.addEventListener('click', (e) => {
        e.preventDefault();

        if (isMobile()) {
            // Try opening Instagram app
            window.location.href = "instagram://user?username=kidtivity.in";
            // Fallback to website if app not available
            setTimeout(() => {
                window.location.href = "https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==";
            }, 1000);
        } else {
            // Desktop: open in new tab
            window.open("https://www.instagram.com/kidtivity.in?igsh=MXZ4MTZveDNvMjlmaA==", "_blank");
        }
    });

    /* ------------------------------
       WhatsApp Link (Footer)
    ------------------------------ */
    document.getElementById('WhatsApp')?.addEventListener('click', (e) => {
        e.preventDefault();

        if (isMobile()) {
            // Try opening WhatsApp group in app
            window.location.href = "whatsapp://chat?code=EF7EZfWWglvGdNbhPoROiI";
            // Fallback to WhatsApp web
            setTimeout(() => {
                window.location.href = "https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t";
            }, 1000);
        } else {
            // Desktop: open in new tab
            window.open("https://chat.whatsapp.com/EF7EZfWWglvGdNbhPoROiI?mode=ac_t", "_blank");
        }
    });

    /* ------------------------------
       BUY NOW Buttons — Save product info + description
    ------------------------------ */
    document.querySelectorAll(".simple-card").forEach(card => {
        let buyBtn = card.querySelector("button");
        if (!buyBtn) return; // safety check

        buyBtn.addEventListener("click", function () {
            let productName = card.querySelector("h3")?.textContent.trim() || "";
            let productImg = card.querySelector("img")?.getAttribute("src") || "";
            let priceText = card.querySelector(".price")?.textContent.trim() || "";
            let price = priceText.replace(/[^\d.]/g, ""); // numbers only

            // Get the hidden description text
            let productDescription = card.querySelector("#description")?.textContent.trim() || "";

            // Save all data to localStorage
            localStorage.setItem("selectedProduct", JSON.stringify({
                name: productName,
                price: price,
                image: productImg,
                description: productDescription
            }));

            // Redirect to checkout page
            window.location.href = "checkout1.html";
        });
    });
});
