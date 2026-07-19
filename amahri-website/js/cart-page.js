// =========================
// Cart Page
// =========================

function renderCartPage() {

    const itemsContainer = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");

    if (!itemsContainer || !totalEl) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        html += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div>

                <h3>${item.name}</h3>

                <p>${item.brand}</p>

                <p>Size : ${item.size} ml</p>

                <p>Quantity : ${item.quantity}</p>

                <h4>${item.price} DH</h4>

                <button
                    class="btn"
                    onclick="removeCartItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    if (cart.length === 0) {

        html = `

        <h2 style="text-align:center">

            Your cart is empty 🛒

        </h2>

        `;

    }

    itemsContainer.innerHTML = html;

    totalEl.textContent = "Total : " + total + " DH";

}

function removeCartItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCounter === "function") {

        updateCartCounter();

    }

    renderCartPage();

}

if (document.getElementById("cart-items")) {

    renderCartPage();

}
