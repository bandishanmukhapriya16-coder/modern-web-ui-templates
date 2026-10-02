/* =====================================================
   MEDORA - MEDICATION REMINDER
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
       ================================================= */

    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    const addMedicineBtn =
        document.getElementById("addMedicineBtn");

    const addMedicineHero =
        document.getElementById("addMedicineHero");

    const ctaAddBtn =
        document.getElementById("ctaAddBtn");

    const medicineModal =
        document.getElementById("medicineModal");

    const modalClose =
        document.getElementById("modalClose");

    const medicineForm =
        document.getElementById("medicineForm");

    const profileBtn =
        document.getElementById("profileBtn");

    const viewScheduleBtn =
        document.getElementById("viewScheduleBtn");

    const refillAllBtn =
        document.getElementById("refillAllBtn");

    const exportBtn =
        document.getElementById("exportBtn");

    const routineBtn =
        document.getElementById("routineBtn");

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const completedCount =
        document.getElementById("completedCount");

    const dailyProgress =
        document.getElementById("dailyProgress");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressRing =
        document.getElementById("progressRing");

    const currentDate =
        document.getElementById("currentDate");


    /* =================================================
       DATE
       ================================================= */

    const today = new Date();

    const dateText = today.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "short",
            day: "numeric"
        }
    );

    currentDate.textContent = dateText;


    /* =================================================
       DARK MODE
       ================================================= */

    const savedTheme =
        localStorage.getItem("medoraTheme");

    if (savedTheme === "dark") {

        body.setAttribute(
            "data-theme",
            "dark"
        );

        themeToggle.textContent = "☀";

    }


    themeToggle.addEventListener("click", () => {

        const isDark =
            body.getAttribute("data-theme") === "dark";

        if (isDark) {

            body.removeAttribute("data-theme");

            themeToggle.textContent = "☾";

            localStorage.setItem(
                "medoraTheme",
                "light"
            );

        } else {

            body.setAttribute(
                "data-theme",
                "dark"
            );

            themeToggle.textContent = "☀";

            localStorage.setItem(
                "medoraTheme",
                "dark"
            );

        }

    });


    /* =================================================
       MOBILE NAVIGATION
       ================================================= */

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.textContent =
            navLinks.classList.contains("active")
                ? "×"
                : "☰";

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuBtn.textContent = "☰";

            });

        });


    /* =================================================
       TOAST
       ================================================= */

    let toastTimer;

    function showToast(title, message) {

        toastTitle.textContent = title;

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    }


    /* =================================================
       MODAL
       ================================================= */

    function openModal() {

        medicineModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeModal() {

        medicineModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    addMedicineBtn.addEventListener(
        "click",
        openModal
    );

    addMedicineHero.addEventListener(
        "click",
        openModal
    );

    ctaAddBtn.addEventListener(
        "click",
        openModal
    );

    modalClose.addEventListener(
        "click",
        closeModal
    );


    medicineModal.addEventListener(
        "click",
        event => {

            if (event.target === medicineModal) {
                closeModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* =================================================
       ADD MEDICATION
       ================================================= */

    medicineForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document
                    .getElementById("medicineName")
                    .value
                    .trim();

            const type =
                document
                    .getElementById("medicineType")
                    .value;

            const time =
                document
                    .getElementById("medicineTime")
                    .value;

            if (!name || !time) {
                return;
            }

            closeModal();

            medicineForm.reset();

            showToast(
                "Reminder created",
                `${name} (${type}) was added to your routine.`
            );

        }
    );


    /* =================================================
       MARK DOSE AS TAKEN
       ================================================= */

    const doseButtons =
        document.querySelectorAll(
            ".mark-taken"
        );


    doseButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".medication-card"
                    );

                const medicineName =
                    card.querySelector("h3")
                        .textContent;

                if (
                    button.classList.contains(
                        "completed-action"
                    )
                ) {
                    return;
                }

                button.textContent = "✓ Taken";

                button.classList.add(
                    "completed-action"
                );

                card.classList.add(
                    "completed"
                );

                const badge =
                    card.querySelector(
                        ".upcoming-badge"
                    );

                if (badge) {

                    badge.textContent =
                        "Taken";

                    badge.classList.remove(
                        "upcoming-badge"
                    );

                    badge.classList.add(
                        "taken-badge"
                    );

                }

                updateProgress();

                showToast(
                    "Dose recorded",
                    `${medicineName} marked as taken.`
                );

            }
        );

    });


    /* =================================================
       UPDATE PROGRESS
       ================================================= */

    function updateProgress() {

        const completed =
            document.querySelectorAll(
                ".medication-card.completed"
            ).length;

        const total =
            document.querySelectorAll(
                ".medication-card"
            ).length;

        const percentage =
            Math.round(
                (completed / total) * 100
            );

        completedCount.textContent =
            completed;

        dailyProgress.style.width =
            `${percentage}%`;

        progressPercent.textContent =
            `${percentage}%`;

        const circumference = 364.4;

        const offset =
            circumference -
            (circumference * percentage / 100);

        progressRing.style.strokeDashoffset =
            offset;

    }


    /* =================================================
       VIEW SCHEDULE
       ================================================= */

    viewScheduleBtn.addEventListener(
        "click",
        () => {

            document
                .getElementById("medications")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =================================================
       REFILL
       ================================================= */

    refillAllBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Refill management",
                "Daily Capsule has the lowest remaining supply."
            );

        }
    );


    /* =================================================
       EXPORT
       ================================================= */

    exportBtn.addEventListener(
        "click",
        () => {

            showToast(
                "History ready",
                "Your medication history is ready to export."
            );

        }
    );


    /* =================================================
       PROFILE
       ================================================= */

    profileBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Profile",
                "Welcome back to your Medora dashboard."
            );

        }
    );


    /* =================================================
       ROUTINE
       ================================================= */

    routineBtn.addEventListener(
        "click",
        () => {

            document
                .getElementById("medications")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =================================================
       IMAGE ERROR HANDLING
       ================================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "linear-gradient(135deg,#dcece1,#eef3ef)";

                }
            );

        });


    /* =================================================
       SCROLL REVEAL
       ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".stat-card, .medication-card, .supply-card, .history-row, .insight-main, .routine-card"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(16px)";

        element.style.transition =
            "opacity .55s ease, transform .55s ease";

        observer.observe(element);

    });


    /* =================================================
       KEYBOARD SHORTCUT
       ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key.toLowerCase() === "m" &&
                !event.target.matches(
                    "input, textarea, select"
                )
            ) {

                openModal();

            }

        }
    );


    /* =================================================
       INITIAL PROGRESS
       ================================================= */

    updateProgress();

});