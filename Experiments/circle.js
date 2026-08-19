const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const drawingArea = document.querySelector(".drawing-area");
const instruction = document.getElementById("instruction");

const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");

const resetButton = document.getElementById("reset");
const tryAgainButton = document.getElementById("tryAgain");


let drawing = false;
let points = [];


/* =========================
   CANVAS SETUP
========================= */

function resizeCanvas() {

    canvas.width = drawingArea.clientWidth;
    canvas.height = drawingArea.clientHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================
   GET POINTER POSITION
========================= */

function getPosition(event) {

    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };

}


/* =========================
   START DRAWING
========================= */

function startDrawing(event) {

    drawing = true;

    points = [];

    instruction.style.display = "none";

    const point = getPosition(event);

    points.push(point);

    ctx.beginPath();

    ctx.moveTo(point.x, point.y);

}


/* =========================
   DRAW
========================= */

function draw(event) {

    if (!drawing) return;

    const point = getPosition(event);

    points.push(point);

    ctx.lineTo(point.x, point.y);

    ctx.strokeStyle = "#111";

    ctx.lineWidth = 3;

    ctx.lineCap = "round";

    ctx.stroke();

}


/* =========================
   STOP DRAWING
========================= */

function stopDrawing() {

    if (!drawing) return;

    drawing = false;

    if (points.length > 20) {

        calculateScore();

    }

}


/* =========================
   CALCULATE SCORE
========================= */

function calculateScore() {

    const center = calculateCenter();

    const distances = points.map(point => {

        return Math.sqrt(
            Math.pow(point.x - center.x, 2) +
            Math.pow(point.y - center.y, 2)
        );

    });


    const averageRadius =
        distances.reduce((a, b) => a + b, 0)
        / distances.length;


    const deviations = distances.map(distance => {

        return Math.abs(distance - averageRadius);

    });


    const averageDeviation =
        deviations.reduce((a, b) => a + b, 0)
        / deviations.length;


    const error =
        averageDeviation / averageRadius;


    let score =
        100 - (error * 300);


    score = Math.max(0, Math.min(100, score));

    score = Math.round(score);


    displayResult(score);

}


/* =========================
   FIND CENTER
========================= */

function calculateCenter() {

    let totalX = 0;
    let totalY = 0;

    points.forEach(point => {

        totalX += point.x;
        totalY += point.y;

    });


    return {

        x: totalX / points.length,

        y: totalY / points.length

    };

}


/* =========================
   SHOW RESULT
========================= */

function displayResult(score) {

    result.classList.add("visible");

    scoreElement.textContent = score;


    if (score >= 95) {

        message.textContent =
            "That's ridiculously close.";

    }

    else if (score >= 85) {

        message.textContent =
            "Very nice. Almost perfect.";

    }

    else if (score >= 70) {

        message.textContent =
            "Not bad. Keep practicing.";

    }

    else if (score >= 50) {

        message.textContent =
            "You've got the general idea.";

    }

    else {

        message.textContent =
            "That circle had other plans.";

    }

}


/* =========================
   RESET
========================= */

function reset() {

    drawing = false;

    points = [];

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    instruction.style.display = "block";

    result.classList.remove("visible");

}


resetButton.addEventListener("click", reset);

tryAgainButton.addEventListener("click", reset);


/* =========================
   POINTER EVENTS
========================= */

canvas.addEventListener(
    "pointerdown",
    startDrawing
);

canvas.addEventListener(
    "pointermove",
    draw
);

canvas.addEventListener(
    "pointerup",
    stopDrawing
);

canvas.addEventListener(
    "pointercancel",
    stopDrawing
);