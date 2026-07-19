// =========================
// Wishlist Page
// =========================

const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlist-container");

if (container) {

    let html = "";

    wishlistItems.forEach(id => {

        const product = products.find(p => p.id === id);

        if (product) {

            html += `

            <div class="card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.brand}</p>

                <h4>From ${product.price30} DH</h4>

                <div class="card-buttons">

                    <a href="product.html?id=${product.id}" class="btn">
                        View Product
                    </a>

                    <button class="btn" onclick="removeWishlist(${product.id})">
                        Remove
                    </button>

                </div>

            </div>

            `;

        }

    });

    if (html === "") {

        html = `
        <h2 style="text-align:center">
            Your wishlist is empty ❤️
        </h2>
        `;

    }

    container.innerHTML = html;

}

function removeWishlist(id) {

    let list = JSON.parse(localStorage.getItem("wishlist")) || [];

    list = list.filter(item => item !== id);

    localStorage.setItem("wishlist", JSON.stringify(list));

    location.reload();

}