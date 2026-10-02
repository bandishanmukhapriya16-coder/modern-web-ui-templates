/* =========================
   ELEMENTS
========================= */

const themeToggle = document.getElementById("themeToggle");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const routineItems = document.querySelectorAll("[data-routine]");
const routineCount = document.getElementById("routineCount");
const completeRoutine = document.getElementById("completeRoutine");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const ctaButton = document.getElementById("ctaButton");

const learnButtons = document.querySelectorAll(".learn-button");


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


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.textContent = "☰";

    });

});


/* =========================
   DARK MODE
========================= */

const savedTheme = localStorage.getItem("dermacare-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");
    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    if (darkMode) {

        themeToggle.textContent = "☀";

        localStorage.setItem(
            "dermacare-theme",
            "dark"
        );

        showToast("Dark mode enabled");

    } else {

        themeToggle.textContent = "☾";

        localStorage.setItem(
            "dermacare-theme",
            "light"
        );

        showToast("Light mode enabled");

    }

});


/* =========================
   ROUTINE TRACKING
========================= */

function updateRoutineCount() {

    const completed = document.querySelectorAll(
        ".routine-item.completed"
    ).length;

    routineCount.textContent = `${completed}/4`;

}


routineItems.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("completed");

        updateRoutineCount();

        const completed =
            item.classList.contains("completed");

        if (completed) {

            showToast("Routine step completed ✓");

        } else {

            showToast("Routine step unchecked");

        }

    });

});


/* =========================
   COMPLETE ROUTINE
========================= */

completeRoutine.addEventListener("click", () => {

    routineItems.forEach(item => {
        item.classList.add("completed");
    });

    updateRoutineCount();

    completeRoutine.textContent = "Routine completed ✓";

    showToast(
        "Great job! Today's routine is complete."
    );

});


/* =========================
   CTA
========================= */

ctaButton.addEventListener("click", () => {

    document.getElementById("routine").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Your daily routine is ready.");

});


/* =========================
   SKIN CONCERN BUTTONS
========================= */

const topicMessages = {

    dryness:
        "For dryness, focus on gentle cleansing and regular moisturization.",

    acne:
        "For blemish-prone skin, keep your routine simple and avoid unnecessary touching.",

    sun:
        "Sun protection is an important everyday skincare habit.",

    sensitivity:
        "For sensitive skin, gentle products and gradual changes can help support comfort."

};


learnButtons.forEach(button => {

    button.addEventListener("click", () => {

        const topic = button.dataset.topic;

        showToast(topicMessages[topic]);

    });

});


/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", event => {

    /* D = toggle dark mode */

    if (
        event.key.toLowerCase() === "d" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
    ) {

        themeToggle.click();

    }


    /* R = go to routine */

    if (
        event.key.toLowerCase() === "r" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
    ) {

        document.getElementById("routine").scrollIntoView({
            behavior: "smooth"
        });

    }

});


/* =========================
   INITIAL STATE
========================= */

updateRoutineCount();