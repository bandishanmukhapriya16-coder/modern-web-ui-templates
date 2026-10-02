/* =========================================================
   PRIVACY DISPLAY GUARD
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

const activateButton =
    document.getElementById("activateButton");

const ctaButton =
    document.getElementById("ctaButton");

const privacyModeButton =
    document.getElementById("privacyModeButton");

const privacySwitch =
    document.getElementById("privacySwitch");

const alertSwitch =
    document.getElementById("alertSwitch");

const monitorSwitch =
    document.getElementById("monitorSwitch");

const visibilityStatus =
    document.getElementById("visibilityStatus");

const privacyScore =
    document.getElementById("privacyScore");

const scoreNumber =
    document.getElementById("scoreNumber");

const alertsCount =
    document.getElementById("alertsCount");

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

    if (navLinks.classList.contains("open")) {

        menuButton.textContent = "×";

    } else {

        menuButton.textContent = "☰";
    }
});


/* Close menu after clicking link */

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

    const darkMode =
        body.classList.contains("dark");

    themeToggle.textContent =
        darkMode ? "☀" : "☾";

    localStorage.setItem(
        "privacyGuardTheme",
        darkMode ? "dark" : "light"
    );

    showToast(
        "Appearance updated",
        darkMode
            ? "Dark mode enabled."
            : "Light mode enabled."
    );
});


/* Load saved theme */

const savedTheme =
    localStorage.getItem(
        "privacyGuardTheme"
    );

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.textContent = "☀";
}


/* ================= PRIVACY MODE ================= */

let privacyActive = true;

function updatePrivacyMode() {

    privacyActive =
        privacySwitch.checked;

    if (privacyActive) {

        visibilityStatus.textContent =
            "Private";

        privacyScore.textContent =
            "94%";

        scoreNumber.textContent =
            "94";

        privacyModeButton.textContent =
            "Privacy mode active";

        showToast(
            "Privacy Mode",
            "Your display is protected."
        );

    } else {

        visibilityStatus.textContent =
            "Visible";

        privacyScore.textContent =
            "71%";

        scoreNumber.textContent =
            "71";

        privacyModeButton.textContent =
            "Enable privacy mode";

        showToast(
            "Privacy Mode",
            "Display privacy protection is off."
        );
    }
}


privacySwitch.addEventListener(
    "change",
    updatePrivacyMode
);


privacyModeButton.addEventListener(
    "click",
    () => {

        privacySwitch.checked =
            !privacySwitch.checked;

        updatePrivacyMode();

    }
);


/* ================= ACTIVATE GUARD ================= */

function activateGuard() {

    privacySwitch.checked = true;

    alertSwitch.checked = true;

    monitorSwitch.checked = true;

    privacyActive = true;

    visibilityStatus.textContent =
        "Private";

    privacyScore.textContent =
        "98%";

    scoreNumber.textContent =
        "98";

    showToast(
        "Privacy Guard activated",
        "All protection layers are now active."
    );
}


activateButton.addEventListener(
    "click",
    activateGuard
);


ctaButton.addEventListener(
    "click",
    activateGuard
);


/* ================= ALERT SETTINGS ================= */

alertSwitch.addEventListener(
    "change",
    () => {

        if (alertSwitch.checked) {

            showToast(
                "Exposure Alerts",
                "Privacy alerts have been enabled."
            );

        } else {

            showToast(
                "Exposure Alerts",
                "Privacy alerts have been disabled."
            );
        }

    }
);


/* ================= MONITORING ================= */

monitorSwitch.addEventListener(
    "change",
    () => {

        if (monitorSwitch.checked) {

            showToast(
                "Smart Monitoring",
                "Continuous monitoring is active."
            );

        } else {

            showToast(
                "Smart Monitoring",
                "Continuous monitoring is paused."
            );
        }

    }
);


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".security-card, .tip-card, .control-card, .protection-item"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

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
        "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() === "p" &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey
        ) {

            privacySwitch.checked =
                !privacySwitch.checked;

            updatePrivacyMode();
        }

    }
);


/* ================= INITIAL STATE ================= */

updatePrivacyMode();