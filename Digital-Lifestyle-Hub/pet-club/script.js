/* =========================================================
   PETCLUB - JAVASCRIPT
   ========================================================= */


/* =========================
   DARK MODE TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("petclub-theme", "dark");
        } else {
            localStorage.setItem("petclub-theme", "light");
        }

    });

}


/* =========================
   LOAD SAVED THEME
========================= */

const savedTheme = localStorage.getItem("petclub-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


/* =========================
   BACK TO TOP BUTTON
========================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            alert("Please fill in all the fields.");

            return;
        }

        alert(
            `Thank you, ${name}! 🐾\n\n` +
            `Your message has been received.\n` +
            `We will get back to you soon.`
        );

        contactForm.reset();

    });

}


/* =========================
   SMOOTH NAVIGATION
========================= */

const navigationLinks = document.querySelectorAll(
    'a[href^="#"]'
);

navigationLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

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


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(0, 0, 0, 0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =========================
   SERVICE BOOKING BUTTONS
========================= */

const bookingLinks =
    document.querySelectorAll(
        '.service-bottom a[href="#contact"]'
    );

bookingLinks.forEach((link) => {

    link.addEventListener("click", () => {

        setTimeout(() => {

            const subject =
                document.getElementById("subject");

            if (subject) {
                subject.value = "Pet Service Booking";
            }

        }, 400);

    });

});


/* =========================
   CONSOLE MESSAGE
========================= */

console.log(
    "🐾 PETclub website loaded successfully!"
);