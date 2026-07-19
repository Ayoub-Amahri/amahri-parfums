// =========================
// Wishlist
// =========================

function getWishlist() {

    return JSON.parse(localStorage.getItem("wishlist")) || [];

}

function saveWishlist(wishlist) {

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

}

function toggleWishlist(id) {

    let wishlist = getWishlist();

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

    } else {

        wishlist.push(id);

    }

    saveWishlist(wishlist);

    location.reload();

}