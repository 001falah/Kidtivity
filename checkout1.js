// Delivery method toggle buttons
const deliveryBtn = document.getElementById('deliveryBtn');
const storeBtn = document.getElementById('storeBtn');

if (deliveryBtn && storeBtn) {
  deliveryBtn.addEventListener('click', () => {
    deliveryBtn.classList.add('active');
    deliveryBtn.setAttribute('aria-pressed', 'true');
    storeBtn.classList.remove('active');
    storeBtn.setAttribute('aria-pressed', 'false');
  });

  storeBtn.addEventListener('click', () => {
    storeBtn.classList.add('active');
    storeBtn.setAttribute('aria-pressed', 'true');
    deliveryBtn.classList.remove('active');
    deliveryBtn.setAttribute('aria-pressed', 'false');
  });
}

// Payment method toggle buttons
const pmButtons = document.querySelectorAll('.payment-methods button');
pmButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    pmButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
  });
});

// Your Google Apps Script Web App URL
document.getElementById("checkoutForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwJCXL-umuS8JXjr7XdFL8-R7Psa2y6wH8bMhG6Xt2kWR2jwn_TuxdWncGbMH_VnbaNlw/exec"; // From Apps Script deployment

  // Get form values
  const formData = Object.fromEntries(new FormData(e.target).entries());

  // Get order summary values from the page
  const productName = document.querySelector(".order-prod b")?.textContent.trim() || "";
  const sizeColourText = document.querySelector(".order-prod span")?.textContent.trim() || "";
  const subtotal = document.querySelector(".order-details .row:nth-child(1) span:last-child")?.textContent.trim() || "";
  const discount = document.querySelector(".order-details .row:nth-child(2) span:last-child")?.textContent.trim() || "";
  const shipping = document.querySelector(".order-details .row:nth-child(3) span:last-child")?.textContent.trim() || "";
  const total = document.querySelector(".order-details .row.total span:last-child")?.textContent.trim() || "";

  // Extract size and colour
  let size = "", colour = "";
  if (sizeColourText.includes("Size:") && sizeColourText.includes("Colour:")) {
    size = sizeColourText.split("|")[0].replace("Size:", "").trim();
    colour = sizeColourText.split("|")[1].replace("Colour:", "").trim();
  }

  // Merge all data
  const payload = {
    ...formData,
    productName,
    size,
    colour,
    subtotal,
    discount,
    shipping,
    total
  };

  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await res.json();

    if (json.result === "success") {
      alert("✅ Order placed successfully! Thank you for shopping with us.");
      e.target.reset();
    } else {
      alert("❌ Something went wrong while placing your order. Please try again.");
    }

  } catch (err) {
    alert("❌ Something went wrong: " + err.message);
  }
});
