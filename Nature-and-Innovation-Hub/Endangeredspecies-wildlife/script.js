/* =========================================================
   WILDGUARD — JAVASCRIPT
   ========================================================= */


/* ================= DARK MODE ================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("wildguard-theme", "dark");
        } else {
            localStorage.setItem("wildguard-theme", "light");
        }

    });
}


/* Load saved theme */

const savedTheme = localStorage.getItem("wildguard-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


/* ================= SPECIES FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const speciesCards =
    document.querySelectorAll(".species-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory =
            button.getAttribute("data-filter");


        speciesCards.forEach((card) => {

            const category =
                card.getAttribute("data-category");

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* ================= SEARCH SPECIES ================= */

const searchInput =
    document.getElementById("speciesSearch");


if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchText =
            searchInput.value.toLowerCase().trim();


        speciesCards.forEach((card) => {

            const speciesName =
                card.getAttribute("data-name").toLowerCase();

            const cardText =
                card.textContent.toLowerCase();


            if (
                speciesName.includes(searchText) ||
                cardText.includes(searchText)
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

}


/* ================= FAVORITE BUTTONS ================= */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        if (button.classList.contains("saved")) {

            button.textContent = "♥";

            showToast("Species added to your watchlist.");

        } else {

            button.textContent = "♡";

            showToast("Species removed from your watchlist.");

        }

    });

});


/* ================= TOAST ================= */

function showToast(message) {

    const existingToast =
        document.querySelector(".wildguard-toast");

    if (existingToast) {
        existingToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "wildguard-toast";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(() => {
        toast.classList.add("show");
    }, 20);


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2800);

}


/* ================= TOAST STYLES ================= */

const toastStyles =
    document.createElement("style");

toastStyles.textContent = `

    .wildguard-toast {
        position: fixed;

        right: 22px;
        bottom: 22px;

        max-width: 320px;

        padding: 14px 18px;

        border-radius: 14px;

        background: #24543b;
        color: white;

        font-family: "DM Sans", Arial, sans-serif;

        font-size: 12px;
        font-weight: 600;

        box-shadow: 0 15px 35px rgba(0,0,0,0.2);

        opacity: 0;

        transform: translateY(15px);

        transition: 0.3s ease;

        z-index: 2000;
    }

    .wildguard-toast.show {
        opacity: 1;
        transform: translateY(0);
    }

    body.dark-mode .wildguard-toast {
        background: #83ad87;
        color: #071008;
    }

`;

document.head.appendChild(toastStyles);


/* ================= SUPPORT BUTTON ================= */

const supportButton =
    document.getElementById("supportButton");


if (supportButton) {

    supportButton.addEventListener("click", () => {

        showToast(
            "Thank you for supporting wildlife conservation! 🐾"
        );

    });

}


/* ================= SMOOTH NAVIGATION ================= */

const navigationLinks =
    document.querySelectorAll('a[href^="#"]');


navigationLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (
            targetId &&
            targetId !== "#" &&
            document.querySelector(targetId)
        ) {

            event.preventDefault();

            const targetSection =
                document.querySelector(targetId);


            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 40) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(23, 35, 29, 0.08)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

});


/* ================= STORY INTERACTION ================= */

const storyLinks =
    document.querySelectorAll(".story-content a");


storyLinks.forEach((link) => {

    link.addEventListener("click", () => {

        showToast(
            "This conservation story will be available soon."
        );

    });

});


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener("keydown", (event) => {

    /* Press / to search */

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        event.preventDefault();

        if (searchInput) {
            searchInput.focus();
        }

    }


    /* Press Escape to clear search */

    if (event.key === "Escape") {

        if (searchInput) {

            searchInput.value = "";

            speciesCards.forEach((card) => {
                card.classList.remove("hidden");
            });

        }

    }

});


/* ================= IMAGE ERROR HANDLING ================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.background =
            "#dce8dc";

        image.style.objectFit =
            "cover";

    });

});


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "🌿 WildGuard website loaded successfully!"
);