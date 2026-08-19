const objects = [

    {
        name: "Atom",

        size: 1e-10,

        displaySize:
            "0.0000000001 m",

        description:
            "One of the smallest structures that makes up ordinary matter."
    },

    {
        name: "DNA",

        size: 2e-9,

        displaySize:
            "0.000000002 m",

        description:
            "A molecule containing the instructions used by living organisms."
    },

    {
        name: "Cell",

        size: 1e-5,

        displaySize:
            "0.00001 m",

        description:
            "The basic structural unit of life."
    },

    {
        name: "Ant",

        size: 0.005,

        displaySize:
            "0.005 m",

        description:
            "A tiny insect that can carry many times its own weight."
    },

    {
        name: "Human",

        size: 1.7,

        displaySize:
            "1.7 m",

        description:
            "You. A human being standing roughly one to two meters tall."
    },

    {
        name: "Car",

        size: 4.5,

        displaySize:
            "4.5 m",

        description:
            "A typical modern passenger car."
    },

    {
        name: "Building",

        size: 150,

        displaySize:
            "150 m",

        description:
            "A large skyscraper reaching hundreds of meters into the sky."
    },

    {
        name: "Mountain",

        size: 8849,

        displaySize:
            "8,849 m",

        description:
            "Mount Everest, the highest mountain above sea level."
    },

    {
        name: "Earth",

        size: 1.27e7,

        displaySize:
            "12,742 km",

        description:
            "Our home planet."
    },

    {
        name: "Jupiter",

        size: 1.39e8,

        displaySize:
            "139,820 km",

        description:
            "The largest planet in our solar system."
    },

    {
        name: "Sun",

        size: 1.39e9,

        displaySize:
            "1.39 million km",

        description:
            "The star at the center of our solar system."
    },

    {
        name: "Milky Way",

        size: 9.46e20,

        displaySize:
            "≈100,000 light-years",

        description:
            "The galaxy containing our solar system."
    }

];


let currentIndex = 0;


const objectElement =
    document.getElementById("object");

const objectName =
    document.getElementById("objectName");

const objectDescription =
    document.getElementById("objectDescription");

const objectSize =
    document.getElementById("objectSize");

const objectIndex =
    document.getElementById("objectIndex");

const progressBar =
    document.getElementById("progressBar");

const resetButton =
    document.getElementById("resetScale");


/* =========================
   DISPLAY OBJECT
========================= */

function updateObject() {

    const item =
        objects[currentIndex];


    objectName.textContent =
        item.name;


    objectDescription.textContent =
        item.description;


    objectSize.textContent =
        item.displaySize;


    objectIndex.textContent =

        `${String(currentIndex + 1).padStart(2, "0")}
         /
         ${String(objects.length).padStart(2, "0")}`;


    const progress =
        (currentIndex /
            (objects.length - 1))
        * 100;


    progressBar.style.width =
        `${progress}%`;


    updateVisualSize(item.size);

}


/* =========================
   LOGARITHMIC SCALE
========================= */

function updateVisualSize(size) {

    const minSize =
        Math.log10(objects[0].size);

    const maxSize =
        Math.log10(
            objects[objects.length - 1].size
        );


    const value =
        Math.log10(size);


    const normalized =
        (value - minSize)
        /
        (maxSize - minSize);


    /*
        Convert logarithmic
        size into a visual size.
    */

    const visualSize =
        25 + normalized * 350;


    objectElement.style.width =
        `${visualSize}px`;

    objectElement.style.height =
        `${visualSize}px`;

}


/* =========================
   NEXT
========================= */

function nextObject() {

    if (
        currentIndex <
        objects.length - 1
    ) {

        currentIndex++;

        updateObject();

    }

}


/* =========================
   PREVIOUS
========================= */

function previousObject() {

    if (currentIndex > 0) {

        currentIndex--;

        updateObject();

    }

}


/* =========================
   WHEEL
========================= */

window.addEventListener(
    "wheel",
    event => {

        if (event.deltaY > 0) {

            nextObject();

        }
        else {

            previousObject();

        }

    },
    {
        passive: true
    }
);


/* =========================
   KEYBOARD
========================= */

window.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowRight"
        ) {

            nextObject();

        }


        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowLeft"
        ) {

            previousObject();

        }

    }
);


/* =========================
   RESET
========================= */

resetButton.addEventListener(
    "click",
    () => {

        currentIndex = 0;

        updateObject();

    }
);


/* =========================
   INITIALIZE
========================= */

updateObject();