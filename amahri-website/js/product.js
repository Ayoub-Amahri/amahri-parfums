    // =========================
// PRODUCT PAGE
// =========================

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const product = products.find(item => item.id === id);

if (!product) {

    document.querySelector(".product-page").innerHTML = `
        <h2 style="text-align:center;color:#d4af37;">
            Product Not Found
        </h2>
    `;

} else {

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-brand").textContent = product.brand;

    document.getElementById("product-description").textContent = product.description;

    document.getElementById("product-top").textContent =
product.top;

document.getElementById("product-heart").textContent =
product.heart;

document.getElementById("product-base").textContent =
product.base;

    document.getElementById("product-image").src = product.image;

    document.getElementById("product-price").textContent =
        product.price30 + " DH";

    // ---- Dynamic SEO for this specific product ----

    const seoTitle = product.name + " — " + product.brand + " | AMAHRI";
    const seoDesc = product.description +
        " Top notes: " + product.top + ", Heart: " + product.heart +
        ", Base: " + product.base + ". Longevity: " + product.longevity +
        ". From " + product.price30 + " DH. Fast delivery across Morocco.";

    document.title = seoTitle;

    const setMeta = (selector, attr, value) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", seoDesc);
    setMeta('meta[property="og:title"]', "content", seoTitle);
    setMeta('meta[property="og:description"]', "content", seoDesc);
    setMeta('meta[name="twitter:title"]', "content", seoTitle);
    setMeta('meta[name="twitter:description"]', "content", seoDesc);

    const canonicalUrl = "https://www.amahri.ma/product.html?id=" + product.id;
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);

    const productLd = document.createElement("script");
    productLd.type = "application/ld+json";
    productLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": seoDesc,
        "image": "https://www.amahri.ma/" + product.image,
        "brand": {
            "@type": "Brand",
            "name": product.brand
        },
        "offers": {
            "@type": "Offer",
            "url": canonicalUrl,
            "priceCurrency": "MAD",
            "price": product.price30,
            "availability": product.stock > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock"
        },
        "aggregateRating": product.reviews ? {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviews
        } : undefined
    });
    document.head.appendChild(productLd);

}


// =========================
// CHANGE PRICE
// =========================

const sizeSelect = document.getElementById("size");

sizeSelect.addEventListener("change", function () {

    let price = product.price30;

    if (this.value === "30") {

        price = product.price30;

    }

    if (this.value === "50") {

        price = product.price50;

    }

    document.getElementById("product-price").textContent =
        price + " DH";

});

// =========================
// ADD TO CART
// =========================

document.getElementById("add-cart").addEventListener("click", function (e) {

    e.preventDefault();

    const size = sizeSelect.value;

    let price = product.price30;

    if (size === "30") {

        price = product.price30;

    }

    if (size === "50") {

        price = product.price50;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item =>
        item.id === product.id &&
        item.size === size
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            brand: product.brand,

            image: product.image,

            size: size,

            quantity: 1,

            price: price

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();

    alert("✅ Product added to cart");

});

// =========================
// PRODUCT WISHLIST
// =========================

const wishlistBtn = document.getElementById("wishlist-product");

let productWishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlistBtn) {

    if (productWishlist.includes(product.id)) {

        wishlistBtn.innerHTML = "❤️";

    } else {

        wishlistBtn.innerHTML = "🤍";

    }

    wishlistBtn.addEventListener("click", function () {

        const index = productWishlist.indexOf(product.id);

        if (index === -1) {

            productWishlist.push(product.id);

            wishlistBtn.innerHTML = "❤️";

        } else {

            productWishlist.splice(index, 1);

            wishlistBtn.innerHTML = "🤍";

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(productWishlist)
        );

    });

}

// =========================
// RELATED PRODUCTS
// =========================

const related = document.getElementById("related-products");

if (related) {

    let html = "";

    products
        .filter(item =>
            item.id !== product.id &&
            item.category === product.category
        )
        .slice(0, 4)
        .forEach(item => {

            html += `

            <div class="card">

                <img src="${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>${item.brand}</p>

                <h4>From ${item.price30} DH</h4>

                <a href="product.html?id=${item.id}" class="btn">

                    View Product

                </a>

            </div>

            `;

        });

    related.innerHTML = html;

}