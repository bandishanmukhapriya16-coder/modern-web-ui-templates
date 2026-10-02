/* =========================
   IMAGE FALLBACK
========================= */

function imageFallback(img) {

    if (img.dataset.fallbackUsed === "true") {
        return;
    }

    img.dataset.fallbackUsed = "true";

    img.src =
        "https://commons.wikimedia.org/wiki/Special:Redirect/file/Soil%20moisture%20sensor.JPG";

}


/* =========================
   ELEMENTS
========================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const refreshBtn =
    document.getElementById("refreshBtn");

const checkSoilBtn =
    document.getElementById("checkSoilBtn");

const runCheckBtn =
    document.getElementById("runCheckBtn");

const quickCheckBtn =
    document.getElementById("quickCheckBtn");

const ctaBtn =
    document.getElementById("ctaBtn");

const addPlantBtn =
    document.getElementById("addPlantBtn");

const plantModal =
    document.getElementById("plantModal");

const closeModal =
    document.getElementById("closeModal");

const plantForm =
    document.getElementById("plantForm");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================
   DARK MODE
========================= */

const savedTheme =
    localStorage.getItem("soilSenseTheme");

if (savedTheme === "dark") {
    body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    localStorage.setItem(
        "soilSenseTheme",
        isDark ? "dark" : "light"
    );

});


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

        });

    });


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================
   SOIL DATA
========================= */

function generateSoilData() {

    const moisture =
        Math.floor(Math.random() * 31) + 50;

    const temperature =
        Math.floor(Math.random() * 7) + 21;

    const ph =
        (Math.random() * 1.2 + 5.9).toFixed(1);

    return {
        moisture,
        temperature,
        ph
    };

}


function updateSoilData() {

    const data =
        generateSoilData();

    const moistureValue =
        document.getElementById("moistureValue");

    const moistureBar =
        document.getElementById("moistureBar");

    const temperatureValue =
        document.getElementById("temperatureValue");

    const phValue =
        document.getElementById("phValue");

    const meterValue =
        document.getElementById("meterValue");

    const heroMoisture =
        document.getElementById("heroMoisture");

    moistureValue.textContent =
        data.moisture;

    moistureBar.style.width =
        `${data.moisture}%`;

    temperatureValue.textContent =
        data.temperature;

    phValue.textContent =
        data.ph;

    meterValue.textContent =
        `${data.moisture}%`;

    heroMoisture.textContent =
        `${data.moisture}%`;

    showToast(
        `Soil data refreshed: ${data.moisture}% moisture`
    );

}


/* =========================
   CHECK BUTTONS
========================= */

checkSoilBtn.addEventListener(
    "click",
    updateSoilData
);

refreshBtn.addEventListener(
    "click",
    updateSoilData
);

runCheckBtn.addEventListener(
    "click",
    updateSoilData
);

quickCheckBtn.addEventListener(
    "click",
    updateSoilData
);

ctaBtn.addEventListener(
    "click",
    updateSoilData
);


/* =========================
   FAVORITES
========================= */

document.querySelectorAll(".favorite-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            if (
                button.classList.contains("active")
            ) {

                button.textContent = "♥";

                showToast(
                    "Plant added to favorites."
                );

            } else {

                button.textContent = "♡";

                showToast(
                    "Plant removed from favorites."
                );

            }

        });

    });


/* =========================
   PLANT DETAILS
========================= */

document.querySelectorAll(".plant-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Plant details opened."
            );

        });

    });


/* =========================
   ADD PLANT MODAL
========================= */

addPlantBtn.addEventListener("click", () => {

    plantModal.classList.add("show");

});


closeModal.addEventListener("click", () => {

    plantModal.classList.remove("show");

});


plantModal.addEventListener("click", event => {

    if (event.target === plantModal) {

        plantModal.classList.remove("show");

    }

});


/* =========================
   ADD PLANT FORM
========================= */

plantForm.addEventListener("submit", event => {

    event.preventDefault();

    const plantName =
        document.getElementById("plantName").value.trim();

    const plantLocation =
        document.getElementById("plantLocation").value.trim();

    if (!plantName || !plantLocation) {
        return;
    }

    plantModal.classList.remove("show");

    plantForm.reset();

    showToast(
        `${plantName} added to ${plantLocation}.`
    );

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        plantModal.classList.remove("show");

        navLinks.classList.remove("show");

    }

});


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key.toLowerCase() === "s" &&
        !["INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )
    ) {

        updateSoilData();

    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".metric-card, .plant-card, .gallery-card, .insight-card"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* =========================
   INITIAL DATA
========================= */

updateInitialData();


function updateInitialData() {

    const moisture = 68;

    document.getElementById(
        "moistureValue"
    ).textContent = moisture;

    document.getElementById(
        "moistureBar"
    ).style.width = `${moisture}%`;

    document.getElementById(
        "meterValue"
    ).textContent = `${moisture}%`;

    document.getElementById(
        "heroMoisture"
    ).textContent = `${moisture}%`;

}


/* =========================
   CONSOLE INFO
========================= */

console.log(
    "SoilSense loaded successfully."
);

console.log(
    "Press S to run a soil check."
);