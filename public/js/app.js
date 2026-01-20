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