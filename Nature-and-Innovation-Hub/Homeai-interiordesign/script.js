/* =========================================================
   HOME AI — AI INTERIOR DESIGN
   Main JavaScript
   ========================================================= */


/* ================= ELEMENTS ================= */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const startDesignBtn = document.getElementById("startDesignBtn");
const startNavBtn = document.getElementById("startNavBtn");
const mobileStartBtn = document.getElementById("mobileStartBtn");
const finalStartBtn = document.getElementById("finalStartBtn");

const generateBtn = document.getElementById("generateBtn");

const roomType = document.getElementById("roomType");
const previewTitle = document.getElementById("previewTitle");
const previewStyle = document.getElementById("previewStyle");
const previewBudget = document.getElementById("previewBudget");
const previewImage = document.getElementById("previewImage");

const exploreBtn = document.getElementById("exploreBtn");

const backTop = document.getElementById("backTop");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");


/* ================= IMAGE DATA ================= */

const roomImages = {

    "Living Room":
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85",

    "Bedroom":
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",

    "Kitchen":
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",

    "Dining Room":
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",

    "Home Office":
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",

    "Bathroom":
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
};


/* ================= THEME ================= */

const savedTheme = localStorage.getItem("homeai-theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀" : "◐";

    localStorage.setItem(
        "homeai-theme",
        isDark ? "dark" : "light"
    );

    showToast(
        "Theme updated",
        isDark
            ? "Dark mode is now enabled."
            : "Light mode is now enabled."
    );
});


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    menuBtn.textContent =
        mobileMenu.classList.contains("open")
            ? "✕"
            : "☰";
});


/* Close mobile menu when clicking a link */

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* ================= SMOOTH SCROLL ================= */

function scrollToDesign() {

    const designSection =
        document.getElementById("design");

    if (designSection) {

        designSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* Start designing buttons */

startDesignBtn.addEventListener(
    "click",
    scrollToDesign
);

startNavBtn.addEventListener(
    "click",
    scrollToDesign
);

mobileStartBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.remove("open");
        menuBtn.textContent = "☰";

        scrollToDesign();

    }
);

finalStartBtn.addEventListener(
    "click",
    scrollToDesign
);


/* ================= ROOM SELECTION ================= */

roomType.addEventListener("change", () => {

    const selectedRoom = roomType.value;

    previewTitle.textContent =
        `Modern ${selectedRoom}`;

    if (roomImages[selectedRoom]) {

        previewImage.style.opacity = "0.25";

        setTimeout(() => {

            previewImage.src =
                roomImages[selectedRoom];

            previewImage.style.opacity = "1";

        }, 180);

    }

    showToast(
        "Room selected",
        `${selectedRoom} is ready for your design.`
    );

});


/* ================= STYLE SELECTION ================= */

const styleButtons =
    document.querySelectorAll(".style-option");

styleButtons.forEach(button => {

    button.addEventListener("click", () => {

        styleButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selectedStyle =
            button.dataset.style;

        previewStyle.textContent =
            selectedStyle;

        updatePreviewTitle();

    });

});


/* ================= BUDGET SELECTION ================= */

const budgetButtons =
    document.querySelectorAll(".budget-btn");

budgetButtons.forEach(button => {

    button.addEventListener("click", () => {

        budgetButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        previewBudget.textContent =
            button.dataset.budget;

    });

});


/* ================= UPDATE PREVIEW TITLE ================= */

function updatePreviewTitle() {

    const selectedRoom =
        roomType.value;

    const activeStyle =
        document.querySelector(
            ".style-option.active"
        );

    const selectedStyle =
        activeStyle
            ? activeStyle.dataset.style
            : "Modern";

    previewTitle.textContent =
        `${selectedStyle} ${selectedRoom}`;

}


/* ================= AI DESIGN GENERATOR ================= */

generateBtn.addEventListener("click", () => {

    const selectedRoom =
        roomType.value;

    const activeStyle =
        document.querySelector(
            ".style-option.active"
        );

    const selectedStyle =
        activeStyle
            ? activeStyle.dataset.style
            : "Modern";

    const activeBudget =
        document.querySelector(
            ".budget-btn.active"
        );

    const selectedBudget =
        activeBudget
            ? activeBudget.dataset.budget
            : "₹50K";


    /* Loading state */

    generateBtn.classList.add("loading");

    generateBtn.innerHTML =
        `<span>✦</span> Creating your design...`;


    previewTitle.textContent =
        "Creating your space...";


    previewImage.style.opacity = "0.35";


    /* Simulate AI generation */

    setTimeout(() => {

        previewTitle.textContent =
            `${selectedStyle} ${selectedRoom}`;

        previewStyle.textContent =
            selectedStyle;

        previewBudget.textContent =
            selectedBudget;

        previewImage.style.opacity = "1";

        generateBtn.classList.remove("loading");

        generateBtn.innerHTML =
            `<span>✦</span> Generate My Design`;


        showToast(
            "Design generated",
            `${selectedStyle} ${selectedRoom} concept is ready.`
        );

    }, 1500);

});


/* ================= INSPIRATION FAVORITES ================= */

const heartButtons =
    document.querySelectorAll(".heart-btn");

heartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const isSaved =
            button.classList.toggle("saved");

        button.textContent =
            isSaved ? "♥" : "♡";

        if (isSaved) {

            showToast(
                "Saved to inspiration",
                "This design has been added to your favorites."
            );

        } else {

            showToast(
                "Removed",
                "The design was removed from your favorites."
            );

        }

    });

});


/* ================= EXPLORE BUTTON ================= */

exploreBtn.addEventListener("click", () => {

    const inspirationCards =
        document.querySelectorAll(
            ".inspiration-card"
        );

    inspirationCards.forEach((card, index) => {

        card.style.transform =
            "translateY(-6px)";

        setTimeout(() => {

            card.style.transform =
                "translateY(0)";

        }, 250 + index * 100);

    });

    showToast(
        "More inspiration",
        "Explore the featured designs below."
    );

});


/* ================= LOGIN BUTTON ================= */

const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        showToast(
            "Welcome to HomeAI",
            "Login functionality is ready for integration."
        );

    });

}


/* ================= TOAST FUNCTION ================= */

let toastTimer;

function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3200);

}


/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("visible");

    } else {

        backTop.classList.remove("visible");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= ACTIVE NAVIGATION ================= */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* ================= IMAGE ERROR HANDLING ================= */

const allImages =
    document.querySelectorAll("img");

allImages.forEach(image => {

    image.addEventListener("error", () => {

        image.style.background =
            "linear-gradient(135deg, #dfe8d9, #f0dfd1)";

        image.style.objectFit = "cover";

    });

});


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener("keydown", event => {

    /* Press G to jump to AI design */

    if (
        event.key.toLowerCase() === "g" &&
        !["INPUT", "SELECT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )
    ) {

        scrollToDesign();

    }

    /* Escape closes mobile menu */

    if (event.key === "Escape") {

        mobileMenu.classList.remove("open");

        menuBtn.textContent = "☰";

    }

});


/* ================= PAGE LOAD ================= */

window.addEventListener("load", () => {

    updatePreviewTitle();

    console.log(
        "HomeAI Interior Design website loaded successfully."
    );

});