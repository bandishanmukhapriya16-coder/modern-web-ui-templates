// ========================================
// STELLERIUM - INTERACTIVE STAR MAP
// ========================================


// ========================================
// MOBILE NAVIGATION
// ========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close mobile menu after clicking link

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


// ========================================
// THEME SWITCHER
// ========================================

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");


    if (
        document.body.classList.contains("light")
    ) {

        themeBtn.textContent = "☀";

        localStorage.setItem(
            "stellerium-theme",
            "light"
        );

    } else {

        themeBtn.textContent = "☾";

        localStorage.setItem(
            "stellerium-theme",
            "dark"
        );

    }

});


// Load saved theme

const savedTheme =
    localStorage.getItem(
        "stellerium-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.textContent = "☀";

}


// ========================================
// TOAST NOTIFICATION
// ========================================

const toast =
    document.getElementById("toast");


const toastText =
    document.getElementById("toastText");


let toastTimer;


function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ========================================
// EXPLORE BUTTON
// ========================================

document
    .getElementById("exploreBtn")
    .addEventListener("click", () => {

        document
            .getElementById("explore")
            .scrollIntoView({
                behavior: "smooth"
            });


        showToast(
            "Sky explorer opened ✦"
        );

    });


// ========================================
// START EXPLORING
// ========================================

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        document
            .getElementById("constellations")
            .scrollIntoView({
                behavior: "smooth"
            });


        showToast(
            "Welcome to the constellation map ✦"
        );

    });


// ========================================
// LOCATION BUTTON
// ========================================

document
    .getElementById("locationBtn")
    .addEventListener("click", () => {

        const locationStatus =
            document.getElementById(
                "locationStatus"
            );


        locationStatus.innerHTML =
            `
            <span class="status-dot"></span>
            Location detected • Chennai, India
            `;


        showToast(
            "Sky view updated for your location"
        );

    });


// ========================================
// REFRESH SKY
// ========================================

document
    .getElementById("refreshBtn")
    .addEventListener("click", () => {

        showToast(
            "Night sky data refreshed ✦"
        );


        const stars =
            document.querySelectorAll(
                ".map-star"
            );


        stars.forEach(star => {

            star.style.transform =
                `scale(${0.8 + Math.random() * 0.6})`;

        });

    });


// ========================================
// OBJECT BUTTONS
// ========================================

const objectButtons =
    document.querySelectorAll(
        "[data-object]"
    );


objectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const object =
            button.getAttribute(
                "data-object"
            );


        showToast(
            `Exploring ${object} ✦`
        );

    });

});


// ========================================
// CONSTELLATION DETAILS
// ========================================

document
    .getElementById("constellationBtn")
    .addEventListener("click", () => {

        showToast(
            "Orion contains some of the most recognizable stars in the sky."
        );

    });


// ========================================
// LIVE UTC TIME
// ========================================

function updateTime() {

    const now =
        new Date();


    const hours =
        String(
            now.getUTCHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getUTCMinutes()
        ).padStart(2, "0");


    document
        .getElementById("mapTime")
        .textContent =
        `${hours}:${minutes} UTC`;

}


updateTime();


setInterval(
    updateTime,
    60000
);


// ========================================
// STAR MAP INTERACTION
// ========================================

const mapStars =
    document.querySelectorAll(
        ".map-star"
    );


mapStars.forEach((star, index) => {

    star.addEventListener(
        "click",
        () => {

            showToast(
                `Star ${index + 1} selected ✦`
            );


            star.style.transform =
                "scale(2)";


            setTimeout(() => {

                star.style.transform =
                    "scale(1)";

            }, 600);

        }
    );

});


// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener(
    "keydown",
    event => {

        // Press T for theme

        if (
            event.key.toLowerCase() === "t"
        ) {

            themeBtn.click();

        }


        // Press E for explore

        if (
            event.key.toLowerCase() === "e"
        ) {

            document
                .getElementById("explore")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


// ========================================
// WELCOME MESSAGE
// ========================================

setTimeout(() => {

    showToast(
        "Welcome to Stellerium ✦"
    );

}, 1000);