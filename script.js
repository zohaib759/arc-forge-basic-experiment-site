const cards = document.querySelectorAll(".experiment-card");

cards.forEach((card, index) => {

    card.addEventListener("mouseenter", () => {

        console.log(
            `Experiment ${index + 1} selected`
        );

    });

});