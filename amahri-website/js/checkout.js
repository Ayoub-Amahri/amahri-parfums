const form = document.getElementById("checkout-form");

form.addEventListener("submit", function (e) {

e.preventDefault();

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const city = document.getElementById("city").value;
const address = document.getElementById("address").value;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let message = "🛍️ *New Order - AMAHRI*%0A%0A";

message += "👤 Name: " + name + "%0A";
message += "📞 Phone: " + phone + "%0A";
message += "🏙️ City: " + city + "%0A";
message += "📍 Address: " + address + "%0A%0A";

message += "*Products:*%0A";

cart.forEach(item => {

message += "• " + item.name + " - " + item.size + " - " + item.price + "%0A";

});

const whatsapp =
"https://wa.me/212609180234?text=" + message;

window.open(whatsapp, "_blank");

});