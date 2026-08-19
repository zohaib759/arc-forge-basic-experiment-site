const canvas = document.getElementById("gravityCanvas");

const ctx = canvas.getContext("2d");

const particleCount =
    document.getElementById("particleCount");

const sourceCount =
    document.getElementById("sourceCount");

const clearButton =
    document.getElementById("clearButton");


/* =========================
   CANVAS
========================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================
   MOUSE
========================= */

const mouse = {

    x: canvas.width / 2,

    y: canvas.height / 2,

    active: false

};


canvas.addEventListener("pointermove", event => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

    mouse.active = true;

});


canvas.addEventListener("pointerleave", () => {

    mouse.active = false;

});


/* =========================
   GRAVITY SOURCES
========================= */

let gravitySources = [];


canvas.addEventListener("pointerdown", event => {

    gravitySources.push({

        x: event.clientX,

        y: event.clientY,

        strength: 0.8,

        radius: 7

    });

    updateStats();

});


/* =========================
   PARTICLES
========================= */

let particles = [];


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;


        this.vx =
            (Math.random() - 0.5) * 1.5;

        this.vy =
            (Math.random() - 0.5) * 1.5;


        this.size =
            Math.random() * 2 + 1;


        this.life = 0;

    }


    update() {

        this.life++;


        /* Mouse gravity */

        if (mouse.active) {

            this.applyGravity(
                mouse.x,
                mouse.y,
                0.25
            );

        }


        /* Gravity sources */

        gravitySources.forEach(source => {

            this.applyGravity(
                source.x,
                source.y,
                source.strength
            );

        });


        this.x += this.vx;

        this.y += this.vy;


        /* Friction */

        this.vx *= 0.999;

        this.vy *= 0.999;


        /* Wrap around screen */

        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;

    }


    applyGravity(x, y, strength) {

        const dx = x - this.x;

        const dy = y - this.y;


        const distanceSquared =
            dx * dx + dy * dy;


        const distance =
            Math.sqrt(distanceSquared);


        if (distance < 10)
            return;


        const force =
            strength / distanceSquared;


        this.vx +=
            (dx / distance) * force;

        this.vy +=
            (dy / distance) * force;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";

        ctx.fill();

    }

}


/* =========================
   CREATE PARTICLES
========================= */

function createParticles(amount) {

    particles = [];

    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

    updateStats();

}


createParticles(700);


/* =========================
   ANIMATION
========================= */

function animate() {

    ctx.fillStyle = "rgba(5, 5, 5, 0.18)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });


    drawGravitySources();


    requestAnimationFrame(animate);

}


animate();


/* =========================
   DRAW SOURCES
========================= */

function drawGravitySources() {

    gravitySources.forEach(source => {

        ctx.beginPath();

        ctx.arc(
            source.x,
            source.y,
            source.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#fff";

        ctx.fill();


        ctx.beginPath();

        ctx.arc(
            source.x,
            source.y,
            source.radius * 3,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            "rgba(255,255,255,.25)";

        ctx.stroke();

    });

}


/* =========================
   STATS
========================= */

function updateStats() {

    particleCount.textContent =
        particles.length;

    sourceCount.textContent =
        gravitySources.length;

}


/* =========================
   RESET
========================= */

clearButton.addEventListener(
    "click",
    () => {

        gravitySources = [];

        createParticles(700);

    }
);