const input = document.getElementById("search");

if (input) {

    input.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const name = card.querySelector("h3").textContent.toLowerCase();

            if (name.includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}