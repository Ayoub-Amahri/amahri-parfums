// =========================
// Cart Counter
// =========================

function updateCartCounter(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    const counter = document.getElementById("cart-counter");

    if(counter){

        counter.textContent = total;

    }

}

updateCartCounter();