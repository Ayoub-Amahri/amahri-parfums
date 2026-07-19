// =========================
// Render Products
// =========================

const container = document.getElementById("products-container");

if (container) {

    const category = container.dataset.category;

    const wishlistItems =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    let html = "";

    products
        .filter(product => product.category === category)
        .forEach(product => {

            const liked = wishlistItems.includes(product.id);

            html += `

            <div class="card">

                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(${product.id})">

                    ${liked ? "❤️" : "🤍"}

                </button>

                <span class="badge">
                    ${product.badge}
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.brand}</p>

                <div class="rating">

                    ⭐ ${product.rating}

                    <span>(${product.reviews || 0})</span>

                </div>

                <h4>From ${product.price30} DH</h4>

                <div class="card-buttons">

                    <a
                        href="product.html?id=${product.id}"
                        class="btn">

                        View Product

                    </a>

                    <button
                        class="btn"
                        onclick="addToCart(${product.id})">

                        Add To Cart

                    </button>

                </div>

            </div>

            `;

        });

    container.innerHTML = html;

}