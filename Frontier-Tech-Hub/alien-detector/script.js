// ================= MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuBtn.textContent =
        navLinks.classList.contains("open")
            ? "✕"
            : "☰";

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


// ================= THEME =================

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeToggle.textContent =
        isLight ? "☾" : "☀";

    localStorage.setItem(
        "exoTheme",
        isLight ? "light" : "dark"
    );

    showToast(
        isLight
            ? "Light mode enabled"
            : "Dark mode enabled"
    );

});


if (localStorage.getItem("exoTheme") === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☾";

}


// ================= SCROLL =================

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ================= TOAST =================

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ================= START SCAN =================

function startScan() {

    const radar =
        document.querySelector(".radar");

    radar.style.boxShadow =
        "0 0 45px rgba(113, 228, 209, 0.25)";

    showToast("Deep-space scan initiated...");

    setTimeout(() => {

        radar.style.boxShadow = "";

        showToast(
            "Scan complete — unusual signature detected."
        );

    }, 3000);

}


// ================= RESET =================

function resetScanner() {

    const radar =
        document.querySelector(".radar");

    radar.style.boxShadow = "";

    showToast("Scanner reset.");

}


// ================= TARGET SELECTION =================

function selectTarget(target) {

    const targetName =
        document.getElementById("targetName");

    targetName.textContent = target;

    scrollToSection("scanner");

    showToast(
        `${target} selected for analysis.`
    );

}


// ================= KEYBOARD SHORTCUTS =================

document.addEventListener("keydown", event => {

    if (
        event.key.toLowerCase() === "s" &&
        !["INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )
    ) {

        scrollToSection("scanner");

    }


    if (
        event.key.toLowerCase() === "t" &&
        !["INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )
    ) {

        scrollToSection("targets");

    }

});


// ================= IMAGE FALLBACK =================

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.background =
            "radial-gradient(circle, #244866, #05080d)";

        image.alt = "Space observation";

    });

});