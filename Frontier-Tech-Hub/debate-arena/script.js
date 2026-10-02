/* =========================
   ELEMENTS
========================= */

const themeToggle = document.getElementById("themeToggle");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const topicSearch = document.getElementById("topicSearch");
const filterButtons = document.querySelectorAll(".filter-button");
const topicCards = document.querySelectorAll(".topic-card");

const voteButtons = document.querySelectorAll(".vote-button");
const arjunVote = document.getElementById("arjunVote");
const mayaVote = document.getElementById("mayaVote");

const timerElement = document.getElementById("timer");
const timerBar = document.querySelector(".timer-bar span");

const communityButton =
    document.getElementById("communityButton");

const ctaButton =
    document.getElementById("ctaButton");


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

    menuButton.textContent =
        navLinks.classList.contains("open")
            ? "✕"
            : "☰";

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.textContent = "☰";

    });

});


/* =========================
   DARK MODE
========================= */

const savedTheme =
    localStorage.getItem("voxarena-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    if (dark) {

        themeToggle.textContent = "☀";

        localStorage.setItem(
            "voxarena-theme",
            "dark"
        );

        showToast("Dark mode enabled");

    } else {

        themeToggle.textContent = "☾";

        localStorage.setItem(
            "voxarena-theme",
            "light"
        );

        showToast("Light mode enabled");

    }

});


/* =========================
   TOPIC FILTER
========================= */

let activeFilter = "all";


function filterTopics() {

    const search =
        topicSearch.value
            .toLowerCase()
            .trim();

    topicCards.forEach(card => {

        const category =
            card.dataset.category;

        const title =
            card.dataset.title.toLowerCase();

        const matchesFilter =
            activeFilter === "all" ||
            category === activeFilter;

        const matchesSearch =
            title.includes(search);

        if (
            matchesFilter &&
            matchesSearch
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeFilter =
            button.dataset.filter;

        filterTopics();

    });

});


topicSearch.addEventListener(
    "input",
    filterTopics
);


/* =========================
   VOTING
========================= */

let arjunPercentage = 58;
let mayaPercentage = 42;


voteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const side = button.dataset.side;

        if (side === "Arjun") {

            arjunPercentage =
                Math.min(
                    95,
                    arjunPercentage + 1
                );

            mayaPercentage =
                100 - arjunPercentage;

        } else {

            mayaPercentage =
                Math.min(
                    95,
                    mayaPercentage + 1
                );

            arjunPercentage =
                100 - mayaPercentage;

        }

        arjunVote.textContent =
            `${arjunPercentage}%`;

        mayaVote.textContent =
            `${mayaPercentage}%`;

        showToast(
            `Vote recorded for ${side}.`
        );

    });

});


/* =========================
   LIVE TIMER
========================= */

let seconds = 102;


function updateTimer() {

    if (seconds <= 0) {

        seconds = 180;

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;

    const progress =
        100 - (seconds / 180) * 100;

    timerBar.style.width =
        `${progress}%`;

    seconds--;

}


updateTimer();

setInterval(updateTimer, 1000);


/* =========================
   TOPIC JOIN BUTTONS
========================= */

topicCards.forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.querySelector("h3").textContent;

        showToast(
            `Opening debate: ${title}`
        );

    });

});


/* =========================
   COMMUNITY BUTTON
========================= */

communityButton.addEventListener("click", () => {

    document
        .getElementById("topics")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast(
        "Explore a topic and join the conversation."
    );

});


/* =========================
   CTA BUTTON
========================= */

ctaButton.addEventListener("click", () => {

    document
        .getElementById("live")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast(
        "Opening live debates."
    );

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
        event.key.toLowerCase() === "l" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
    ) {

        document
            .getElementById("live")
            .scrollIntoView({
                behavior: "smooth"
            });

    }


    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuButton.textContent = "☰";

    }

});