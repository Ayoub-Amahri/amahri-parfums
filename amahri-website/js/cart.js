// =========================
// Cart
// =========================

function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}

function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCounter === "function") {

        updateCartCounter();

    }

}

function addToCart(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    let cart = getCart();

    const existing = cart.find(item =>
        item.id === product.id &&
        item.size === "30"
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image,
            size: "30",
            price: product.price30,
            quantity: 1

        });

    }

    saveCart(cart);

    alert("✅ Product added to cart");

}