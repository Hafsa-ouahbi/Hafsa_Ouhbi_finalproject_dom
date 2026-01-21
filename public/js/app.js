let numbers = document.querySelectorAll(".count")

numbers.forEach(function (nb) {
    let end = parseInt(nb.getAttribute("data-target"))
    let cur = 0

    let time = end
    if (time < 100) time = 50
    else if (time <= 500) time = 20
    else time = 1

    let timer = setInterval(function () {
        if (cur < end) {
            cur++
            nb.textContent = cur
        }
        else {
            clearInterval(timer)
        }
    }, time)
})


let btns = document.querySelectorAll(".BTN button");
let plates = document.querySelectorAll(".realMenu div");

btns.forEach(function(b) {
    b.addEventListener("click", function() {
        // njibo category dyal l button li derna eliha click
        let category = b.getAttribute("data-category");

        // show/hide plates
        plates.forEach(function(item) {
            if(item.dataset.category === category) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
});
    const containers = document.querySelectorAll(".carousel-container");

    containers.forEach(container => {

        let carousel = container.querySelector(".carousel");
        let slides = container.querySelectorAll(".slide");
        let index = 0;

        let indicatorsGrp = document.createElement("div");
        indicatorsGrp.className = "indicators-grp";
        container.appendChild(indicatorsGrp);

        slides.forEach((slide, i) => {
            let indicator = document.createElement("div");
            indicator.className = "indicator";
            if (i === 0) indicator.classList.add("activeIndicator");
            indicatorsGrp.appendChild(indicator);

            indicator.addEventListener("click", () => {
                goToSlide(i);
            });
        });

        let indicators = indicatorsGrp.querySelectorAll(".indicator");

        function goToSlide(i) {
            carousel.style.transform = `translateX(-${i * 100}%)`;

            indicators.forEach(ind => ind.classList.remove("activeIndicator"));
            indicators[i].classList.add("activeIndicator");

            index = i;
        }
        setInterval(() => {
            index++;
            if (index >= slides.length) index = 0;
            goToSlide(index);
        }, 3000);
    });