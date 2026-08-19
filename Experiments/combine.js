const elements = {

    fire: {
        name: "Fire",
        emoji: "🔥"
    },

    water: {
        name: "Water",
        emoji: "💧"
    },

    earth: {
        name: "Earth",
        emoji: "🌍"
    },

    air: {
        name: "Air",
        emoji: "💨"
    },

    energy: {
        name: "Energy",
        emoji: "⚡"
    },

    metal: {
        name: "Metal",
        emoji: "🔩"
    },

    plant: {
        name: "Plant",
        emoji: "🌱"
    },

    life: {
        name: "Life",
        emoji: "🧬"
    },

    steam: {
        name: "Steam",
        emoji: "♨️"
    },

    lava: {
        name: "Lava",
        emoji: "🌋"
    },

    dust: {
        name: "Dust",
        emoji: "🌫️"
    },

    storm: {
        name: "Storm",
        emoji: "⛈️"
    },

    electricity: {
        name: "Electricity",
        emoji: "⚡"
    },

    robot: {
        name: "Robot",
        emoji: "🤖"
    },

    technology: {
        name: "Technology",
        emoji: "💻"
    },

    city: {
        name: "City",
        emoji: "🏙️"
    },

    civilization: {
        name: "Civilization",
        emoji: "🌐"
    }

};


/* =========================
   RECIPES
========================= */

const recipes = {

    "fire+water": "steam",

    "earth+fire": "lava",

    "earth+air": "dust",

    "water+air": "storm",

    "energy+metal": "electricity",

    "metal+electricity": "robot",

    "robot+energy": "technology",

    "earth+water": "plant",

    "plant+energy": "life",

    "technology+life": "civilization",

    "civilization+earth": "city"

};


/* =========================
   STATE
========================= */

let discovered = [

    "fire",
    "water",
    "earth",
    "air",
    "energy",
    "metal"
];

let firstElement = null;

let secondElement = null;


/* =========================
   DOM
========================= */

const elementList =
    document.getElementById(
        "elementList"
    );

const slotOne =
    document.getElementById(
        "slotOne"
    );

const slotTwo =
    document.getElementById(
        "slotTwo"
    );

const combineButton =
    document.getElementById(
        "combineButton"
    );

const discovery =
    document.getElementById(
        "discovery"
    );

const discoveryEmoji =
    document.getElementById(
        "discoveryEmoji"
    );

const discoveryName =
    document.getElementById(
        "discoveryName"
    );

const discoveryText =
    document.getElementById(
        "discoveryText"
    );

const discoveryCount =
    document.getElementById(
        "discoveryCount"
    );

const closeDiscovery =
    document.getElementById(
        "closeDiscovery"
    );

const resetButton =
    document.getElementById(
        "resetButton"
    );


/* =========================
   RENDER ELEMENTS
========================= */

function renderElements() {

    elementList.innerHTML = "";

    discovered.forEach(id => {

        const element =
            elements[id];

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "element";

        button.innerHTML = `
            <span>${element.emoji}</span>
            ${element.name}
        `;


        button.addEventListener(
            "click",
            () => selectElement(id)
        );


        elementList.appendChild(
            button
        );

    });


    discoveryCount.textContent =
        discovered.length;

}


/* =========================
   SELECT
========================= */

function selectElement(id) {

    if (!firstElement) {

        firstElement = id;

        renderSlot(
            slotOne,
            id
        );

    }

    else if (!secondElement) {

        secondElement = id;

        renderSlot(
            slotTwo,
            id
        );

    }

    updateCombineButton();

}


/* =========================
   RENDER SLOT
========================= */

function renderSlot(
    slot,
    id
) {

    const element =
        elements[id];

    slot.classList.add(
        "selected"
    );

    slot.innerHTML = `

        <div class="slot-content">

            <span class="emoji">
                ${element.emoji}
            </span>

            <strong>
                ${element.name}
            </strong>

        </div>

    `;

}


/* =========================
   COMBINE BUTTON
========================= */

function updateCombineButton() {

    combineButton.disabled =
        !(
            firstElement &&
            secondElement
        );

}


/* =========================
   CREATE RECIPE KEY
========================= */

function getRecipeKey(
    first,
    second
) {

    return [
        first,
        second
    ]
    .sort()
    .join("+");

}


/* =========================
   COMBINE
========================= */

function combine() {

    if (
        !firstElement ||
        !secondElement
    ) {
        return;
    }


    const key =
        getRecipeKey(
            firstElement,
            secondElement
        );


    const result =
        recipes[key];


    if (!result) {

        showFailure();

        return;

    }


    const isNew =
        !discovered.includes(
            result
        );


    if (isNew) {

        discovered.push(
            result
        );

    }


    showDiscovery(
        result,
        isNew
    );


    renderElements();

}


/* =========================
   SHOW DISCOVERY
========================= */

function showDiscovery(
    id,
    isNew
) {

    const element =
        elements[id];


    discoveryEmoji.textContent =
        element.emoji;

    discoveryName.textContent =
        element.name;


    if (isNew) {

        discoveryText.textContent =
            "You've discovered something new.";

    }

    else {

        discoveryText.textContent =
            "You've already discovered this one.";
    }


    discovery.classList.add(
        "visible"
    );

}


/* =========================
   FAILED COMBINATION
========================= */

function showFailure() {

    discoveryEmoji.textContent =
        "❓";

    discoveryName.textContent =
        "Nothing happened.";

    discoveryText.textContent =
        "Those two things don't seem to create anything... yet.";

    discovery.classList.add(
        "visible"
    );

}


/* =========================
   CLEAR SLOTS
========================= */

function clearSlots() {

    firstElement = null;

    secondElement = null;


    slotOne.innerHTML =
        "<span>+</span>";

    slotTwo.innerHTML =
        "<span>+</span>";


    slotOne.classList.remove(
        "selected"
    );

    slotTwo.classList.remove(
        "selected"
    );


    updateCombineButton();

}


/* =========================
   RESET
========================= */

function reset() {

    discovered = [

        "fire",
        "water",
        "earth",
        "air",
        "energy",
        "metal"

    ];

    clearSlots();

    renderElements();

}


/* =========================
   EVENTS
========================= */

combineButton.addEventListener(
    "click",
    combine
);


closeDiscovery.addEventListener(
    "click",
    () => {

        discovery.classList.remove(
            "visible"
        );

        clearSlots();

    }
);


resetButton.addEventListener(
    "click",
    reset
);


/* =========================
   START
========================= */

renderElements();