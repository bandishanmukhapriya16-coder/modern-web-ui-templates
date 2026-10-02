/* =========================================================
   EXO-SCAN
   Spy Camera Detector
   Interactive JavaScript
========================================================= */


/* ================= ELEMENTS ================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");

const startScan =
    document.getElementById("startScan");

const scanAgain =
    document.getElementById("scanAgain");

const ctaScan =
    document.getElementById("ctaScan");

const scannerStatus =
    document.getElementById("scannerStatus");

const roomStatus =
    document.getElementById("roomStatus");

const scanPercent =
    document.getElementById("scanPercent");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


/* ================= TOAST ================= */

let toastTimer;

function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* ================= MOBILE MENU ================= */

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuButton.textContent =
        navLinks.classList.contains("open")
            ? "×"
            : "☰";

});


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.textContent = "☰";

        });

    });


/* ================= DARK MODE ================= */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀" : "☾";

    localStorage.setItem(
        "exoScanTheme",
        isDark ? "dark" : "light"
    );

    showToast(
        "Appearance updated",
        isDark
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

});


const savedTheme =
    localStorage.getItem("exoScanTheme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.textContent = "☀";
}


/* ================= SCAN SYSTEM ================= */

let scanning = false;

let scanTimer;


function runScan() {

    if (scanning) {
        return;
    }

    scanning = true;

    clearInterval(scanTimer);

    let progress = 0;

    scannerStatus.textContent =
        "SCANNING";

    roomStatus.textContent =
        "ANALYZING ROOM";

    scanPercent.textContent =
        "0%";

    resultTitle.textContent =
        "Scan in progress";

    resultText.textContent =
        "Checking visual safety zones...";


    showToast(
        "Room scan started",
        "EXO-SCAN is checking the room interface."
    );


    scanTimer = setInterval(() => {

        progress += Math.floor(
            Math.random() * 8
        ) + 4;

        if (progress >= 100) {

            progress = 100;

            clearInterval(scanTimer);

            finishScan();

        }

        scanPercent.textContent =
            `${progress}%`;

    }, 220);

}


function finishScan() {

    scanning = false;

    scannerStatus.textContent =
        "COMPLETE";

    roomStatus.textContent =
        "VISUAL CHECK COMPLETE";

    resultTitle.textContent =
        "No obvious visual concern";

    resultText.textContent =
        "The simulated scan found no obvious suspicious object. Continue with a manual visual inspection.";

    showToast(
        "Scan complete",
        "No obvious visual concern detected."
    );

}


startScan.addEventListener(
    "click",
    runScan
);


scanAgain.addEventListener(
    "click",
    runScan
);


ctaScan.addEventListener(
    "click",
    () => {

        document
            .getElementById("scanner")
            .scrollIntoView({
                behavior: "smooth"
            });

        setTimeout(
            runScan,
            500
        );

    }
);


/* ================= CHECK BUTTONS ================= */

const checkButtons =
    document.querySelectorAll(
        ".check-button"
    );


checkButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const card =
                button.closest(
                    ".check-card"
                );

            const title =
                card.querySelector("h3")
                    .textContent;

            button.textContent =
                "Area marked ✓";

            showToast(
                "Inspection zone",
                `${title} added to your checklist.`
            );

        }
    );

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".check-card, .location-card, .visual-point, .result-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(22px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() === "s" &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey
        ) {

            runScan();

        }

    }
);


/* ================= INITIAL MESSAGE ================= */

showToast(
    "EXO-SCAN ready",
    "Press Start Room Scan to begin."
);