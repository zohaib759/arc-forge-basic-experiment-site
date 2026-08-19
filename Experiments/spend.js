const products = [

    {
        name: "Gaming PC",
        price: 2500,
        emoji: "🖥️"
    },

    {
        name: "Sports Car",
        price: 85000,
        emoji: "🏎️"
    },

    {
        name: "Private Jet",
        price: 45000000,
        emoji: "✈️"
    },

    {
        name: "Luxury House",
        price: 750000,
        emoji: "🏠"
    },

    {
        name: "Island",
        price: 12000000,
        emoji: "🏝️"
    },

    {
        name: "Movie Theater",
        price: 5000000,
        emoji: "🎬"
    },

    {
        name: "Robot",
        price: 100000,
        emoji: "🤖"
    },

    {
        name: "Arcade",
        price: 300000,
        emoji: "🕹️"
    },

    {
        name: "Coffee",
        price: 5,
        emoji: "☕"
    }

];


const startingMoney = 1000000;

let balance = startingMoney;

let spent = 0;


/* =========================
   ELEMENTS
========================= */

const productsContainer =
    document.getElementById("products");

const balanceElement =
    document.getElementById("balance");

const spentElement =
    document.getElementById("spent");

const remainingElement =
    document.getElementById("remaining");

const resetButton =
    document.getElementById("resetButton");

const final =
    document.getElementById("final");

const finalMessage =
    document.getElementById("finalMessage");

const startAgain =
    document.getElementById("startAgain");


/* =========================
   FORMAT MONEY
========================= */

function formatMoney(amount) {

    return "$" +
        amount.toLocaleString(
            "en-US"
        );

}


/* =========================
   CREATE PRODUCTS
========================= */

function renderProducts() {

    productsContainer.innerHTML = "";

    products.forEach(
        (product, index) => {

            const card =
                document.createElement("article");

            card.className =
                "product";


            card.innerHTML = `

                <div>

                    <div class="product-emoji">
                        ${product.emoji}
                    </div>

                    <h2>
                        ${product.name}
                    </h2>

                    <div class="product-price">
                        ${formatMoney(product.price)}
                    </div>

                </div>

                <button
                    class="buy-button"
                    data-index="${index}"
                >
                    BUY
                </button>

            `;


            productsContainer.appendChild(card);

        }
    );


    document
        .querySelectorAll(".buy-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    buyProduct(
                        products[index]
                    );

                }
            );

        });

}


/* =========================
   BUY
========================= */

function buyProduct(product) {

    if (balance < product.price) {

        buttonFeedback();

        return;

    }


    balance -= product.price;

    spent += product.price;


    updateUI();


    if (balance <= 0) {

        showFinal();

    }

}


/* =========================
   UPDATE UI
========================= */

function updateUI() {

    balanceElement.textContent =
        formatMoney(balance);

    spentElement.textContent =
        formatMoney(spent);

    remainingElement.textContent =
        formatMoney(balance);

}


/* =========================
   NOT ENOUGH MONEY
========================= */

function buttonFeedback() {

    balanceElement.style.transform =
        "scale(1.05)";

    setTimeout(() => {

        balanceElement.style.transform =
            "scale(1)";

    }, 150);

}


/* =========================
   FINAL
========================= */

function showFinal() {

    final.classList.add("visible");


    finalMessage.textContent =

        `You managed to spend
        ${formatMoney(spent)}.
        That's quite a shopping trip.`;

}


/* =========================
   RESET
========================= */

function reset() {

    balance = startingMoney;

    spent = 0;

    final.classList.remove(
        "visible"
    );

    updateUI();

}


resetButton.addEventListener(
    "click",
    reset
);


startAgain.addEventListener(
    "click",
    reset
);


/* =========================
   START
========================= */

renderProducts();

updateUI();