let numbers = document.querySelectorAll(".count")

numbers.forEach(function (nb) {
    let end = parseInt(nb.getAttribute("data-target"))
    let cur = 0

    let time 
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