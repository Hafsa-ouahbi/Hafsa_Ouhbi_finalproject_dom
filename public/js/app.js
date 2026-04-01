// let numbers = document.querySelectorAll(".count")

// numbers.forEach(function (nb) {
//     let end = parseInt(nb.getAttribute("data-target"))
//     let cur = 0

//     let time = end
//     if (time < 100) time = 50
//     else if (time <= 500) time = 20
//     else time = 1

//     let timer = setInterval(function () {
//         if (cur < end) {
//             cur++
//             nb.textContent = cur
//         }
//         else {
//             clearInterval(timer)
//         }
//     }, time)
// })


// let btns = document.querySelectorAll(".BTN button");
// let plates = document.querySelectorAll(".realMenu div");

// btns.forEach(function(b) {
//     b.addEventListener("click", function() {
//         // njibo category dyal l button li derna eliha click
//         let category = b.getAttribute("data-category");

//         // show/hide plates
//         plates.forEach(function(item) {
//             if(item.dataset.category === category) {
//                 item.style.display = "flex";
//             } else {
//                 item.style.display = "none";
//             }
//         });
//     });
// });
//     const containers = document.querySelectorAll(".carousel-container");

//     containers.forEach(container => {

//         let carousel = container.querySelector(".carousel");
//         let slides = container.querySelectorAll(".slide");
//         let index = 0;

//         let indicatorsGrp = document.createElement("div");
//         indicatorsGrp.className = "indicators-grp";
//         container.appendChild(indicatorsGrp);

//         slides.forEach((slide, i) => {
//             let indicator = document.createElement("div");
//             indicator.className = "indicator";
//             if (i === 0) indicator.classList.add("activeIndicator");
//             indicatorsGrp.appendChild(indicator);

//             indicator.addEventListener("click", () => {
//                 goToSlide(i);
//             });
//         });

//         let indicators = indicatorsGrp.querySelectorAll(".indicator");

//         function goToSlide(i) {
//             carousel.style.transform = `translateX(-${i * 100}%)`;

//             indicators.forEach(ind => ind.classList.remove("activeIndicator"));
//             indicators[i].classList.add("activeIndicator");

//             index = i;
//         }
//         setInterval(() => {
//             index++;
//             if (index >= slides.length) index = 0;
//             goToSlide(index);
//         }, 3000);
//     });








/* ============================================================
   YUMMY — Senior JS Update
   - Counter: IntersectionObserver (only runs when visible)
   - Menu filter: active button highlight + smooth transition
   - Carousel: keyboard nav + swipe support + auto-pause on hover
   - Navbar: scroll-shadow + mobile-friendly active link
   ============================================================ */

/* ─────────────────────────────────────────
   1. NAVBAR — scroll shadow
───────────────────────────────────────── */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
});


/* ─────────────────────────────────────────
   2. COUNTER — only starts when in viewport
───────────────────────────────────────── */
function animateCounter(el) {
    const end = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // ms
    const stepTime = 16;   // ~60fps
    const steps = Math.ceil(duration / stepTime);
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            el.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

const counters = document.querySelectorAll('.count');

// Use IntersectionObserver so counters only fire once when visible
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // run only once
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


/* ─────────────────────────────────────────
   3. MENU FILTER — active state + easing
───────────────────────────────────────── */
const menuBtns = document.querySelectorAll('.BTN button');
const menuItems = document.querySelectorAll('.realMenu div');
const menuTitle = document.querySelector('.title h1');

function filterMenu(category) {
    menuItems.forEach(item => {
        const match = item.dataset.category === category;
        // fade trick: hide → show with opacity
        item.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
        if (match) {
            item.style.display = 'flex';
            // next frame so transition fires
            requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => { item.style.display = 'none'; }, 100);
        }
    });

    // update the title above the grid
    if (menuTitle) {
        menuTitle.textContent = category.toUpperCase();
    }
}

menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // active class handling
        menuBtns.forEach(b => b.classList.remove('active-menu-btn'));
        btn.classList.add('active-menu-btn');

        filterMenu(btn.getAttribute('data-category'));
    });
});

// Set the first button active on load
if (menuBtns.length > 0) {
    menuBtns[0].click();
}

let btns = document.querySelectorAll(".BTN button");
let plates = document.querySelectorAll(".realMenu div");

btns.forEach(function (b) {
    b.addEventListener("click", function () {
        // njibo category dyal l button li derna eliha click
        let category = b.getAttribute("data-category");

        // show/hide plates
        plates.forEach(function (item) {
            if (item.dataset.category === category) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
});

/* ─────────────────────────────────────────
   4. CAROUSEL — keyboard + swipe + pause on hover
───────────────────────────────────────── */
document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel');
    const slides = container.querySelectorAll('.slide');
    let index = 0;
    let autoplayTimer;

    /* --- indicators --- */
    const indicatorsGrp = document.createElement('div');
    indicatorsGrp.className = 'indicators-grp';
    container.appendChild(indicatorsGrp);

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'indicator' + (i === 0 ? ' activeIndicator' : '');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        indicatorsGrp.appendChild(dot);
    });

    const indicators = indicatorsGrp.querySelectorAll('.indicator');

    function goToSlide(i) {
        index = (i + slides.length) % slides.length; // wrap safely
        carousel.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach(d => d.classList.remove('activeIndicator'));
        indicators[index].classList.add('activeIndicator');
    }

    /* --- autoplay --- */
    function startAutoplay() {
        autoplayTimer = setInterval(() => goToSlide(index + 1), 3000);
    }
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    startAutoplay();

    // pause on hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    /* --- keyboard navigation (when focused) --- */
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { stopAutoplay(); goToSlide(index - 1); startAutoplay(); }
        if (e.key === 'ArrowRight') { stopAutoplay(); goToSlide(index + 1); startAutoplay(); }
    });

    /* --- touch/swipe support --- */
    let touchStartX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { // 50px threshold
            stopAutoplay();
            goToSlide(diff > 0 ? index + 1 : index - 1);
            startAutoplay();
        }
    }, { passive: true });
});


function scrollToSection() {
    document.getElementById("conta").scrollIntoView({
        behavior: "smooth"
    });
}


window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        let top = el.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});