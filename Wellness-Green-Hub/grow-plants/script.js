/* ================= ELEMENTS ================= */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const modalOverlay = document.getElementById("modalOverlay");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const ctaAddPlant = document.getElementById("ctaAddPlant");

const plantForm = document.getElementById("plantForm");
const plantName = document.getElementById("plantName");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const filterButtons = document.querySelectorAll(".filter-btn");
const plantCards = document.querySelectorAll(".plant-card");

const locationBtn = document.getElementById("locationBtn");



/* ================= DARK MODE ================= */

const savedTheme = localStorage.getItem("verdant-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const darkMode = body.classList.contains("dark");

    localStorage.setItem(
        "verdant-theme",
        darkMode ? "dark" : "light"
    );

    themeToggle.textContent = darkMode ? "☀" : "☾";

    showToast(
        darkMode
            ? "Dark mode enabled"
            : "Light mode enabled"
    );

});



/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});



/* ================= MODAL ================= */

function openPlantModal() {

    modalOverlay.classList.add("show");

    setTimeout(() => {

        plantName.focus();

    }, 150);

}


function closePlantModal() {

    modalOverlay.classList.remove("show");

}


openModal.addEventListener("click", openPlantModal);

ctaAddPlant.addEventListener("click", openPlantModal);

closeModal.addEventListener("click", closePlantModal);


modalOverlay.addEventListener("click", event => {

    if (event.target === modalOverlay) {

        closePlantModal();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closePlantModal();

    }

});



/* ================= ADD PLANT ================= */

plantForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = plantName.value.trim();

    if (!name) {

        showToast("Please enter a plant name");

        return;

    }

    showToast(`${name} added to your garden 🌱`);

    plantForm.reset();

    closePlantModal();

});



/* ================= FAVORITES ================= */

document.querySelectorAll(".heart-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("favorite");

        if (button.classList.contains("favorite")) {

            button.textContent = "♥";

            showToast("Added to favorites ♥");

        } else {

            button.textContent = "♡";

            showToast("Removed from favorites");

        }

    });

});



/* ================= FILTERS ================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        plantCards.forEach(card => {

            const status = card.dataset.status;

            if (filter === "all") {

                card.classList.remove("hide");

            }

            else if (filter === status) {

                card.classList.remove("hide");

            }

            else {

                card.classList.add("hide");

            }

        });

    });

});



/* ================= CARE BUTTONS ================= */

document.querySelectorAll(".care-button").forEach(button => {

    button.addEventListener("click", () => {

        const plant = button.dataset.plant;

        if (button.classList.contains("water-action")) {

            button.textContent = "✓ Watered";

            button.classList.remove("water-action");

            showToast(`${plant} has been watered 💧`);

        } else {

            showToast(`${plant} care guide opened 🌿`);

        }

    });

});



/* ================= DAILY TASKS ================= */

document.querySelectorAll(".task").forEach(task => {

    const checkButton = task.querySelector(".task-check");

    checkButton.addEventListener("click", () => {

        task.classList.toggle("completed");

        if (task.classList.contains("completed")) {

            checkButton.textContent = "✓";

            showToast("Care task completed 🌱");

        } else {

            checkButton.textContent = "○";

        }

    });

});



/* ================= LOCATION ================= */

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        showToast("Location is not supported");

        return;

    }

    locationBtn.textContent = "📍 Detecting...";

    navigator.geolocation.getCurrentPosition(

        () => {

            locationBtn.textContent = "📍 Location detected";

            showToast("Garden location detected");

        },

        () => {

            locationBtn.textContent = "📍 Chennai";

            showToast("Location permission was not granted");

        }

    );

});



/* ================= TOAST ================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}



/* ================= IMAGE ERROR HANDLING ================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.background =
            "linear-gradient(135deg, #dce8d7, #9fca8f)";

    });

});



/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener("keydown", event => {

    const activeElement = document.activeElement;

    const typing =
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.tagName === "SELECT"
        );

    if (
        event.key.toLowerCase() === "g" &&
        !typing
    ) {

        document
            .getElementById("plants")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

});