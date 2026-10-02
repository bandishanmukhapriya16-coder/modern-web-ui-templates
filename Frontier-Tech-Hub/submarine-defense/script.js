/* =========================
   ELEMENTS
========================= */

const themeToggle = document.getElementById("themeToggle");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const scanButton = document.getElementById("scanButton");
const exploreButton = document.getElementById("exploreButton");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================
   TOAST
========================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);

}


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {

        menuButton.textContent = "✕";

    } else {

        menuButton.textContent = "☰";

    }

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.textContent = "☰";

    });

});


/* =========================
   THEME
========================= */

const savedTheme =
    localStorage.getItem("deepshield-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const lightMode =
        document.body.classList.contains("light");

    if (lightMode) {

        themeToggle.textContent = "☀";

        localStorage.setItem(
            "deepshield-theme",
            "light"
        );

        showToast("Light mode enabled");

    } else {

        themeToggle.textContent = "☾";

        localStorage.setItem(
            "deepshield-theme",
            "dark"
        );

        showToast("Dark mode enabled");

    }

});


/* =========================
   SYSTEM CHECK
========================= */

scanButton.addEventListener("click", () => {

    scanButton.textContent = "Running System Check...";

    showToast("Checking primary systems...");

    setTimeout(() => {

        scanButton.textContent = "System Check Complete ✓";

        showToast(
            "All primary systems are stable."
        );

    }, 1800);


    setTimeout(() => {

        scanButton.textContent = "Run System Check";

    }, 4200);

});


/* =========================
   EXPLORE BUTTON
========================= */

exploreButton.addEventListener("click", () => {

    document
        .getElementById("monitoring")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast("Opening vessel monitoring view.");

});


/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key.toLowerCase() === "d" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
    ) {

        themeToggle.click();

    }


    if (
        event.key.toLowerCase() === "s" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
    ) {

        scanButton.click();

    }


    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuButton.textContent = "☰";

    }

});