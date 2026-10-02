const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const resumeFile = document.getElementById("resumeFile");
const fileName = document.getElementById("fileName");

const analyzeBtn = document.getElementById("analyzeBtn");
const resumeText = document.getElementById("resumeText");

const scoreValue = document.getElementById("scoreValue");
const progressFill = document.getElementById("progressFill");

const toast = document.getElementById("toast");


// ============================
// MOBILE MENU
// ============================

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.textContent =
        navLinks.classList.contains("active")
            ? "×"
            : "☰";
});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });

});


// ============================
// DARK MODE
// ============================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀" : "☾";

    localStorage.setItem("resume-theme", isDark ? "dark" : "light");

    showToast(
        isDark
            ? "Dark mode enabled"
            : "Light mode enabled"
    );
});


// Remember theme

const savedTheme = localStorage.getItem("resume-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀";
}


// ============================
// FILE UPLOAD
// ============================

resumeFile.addEventListener("change", () => {

    const file = resumeFile.files[0];

    if (!file) {
        fileName.textContent = "No file selected";
        return;
    }

    fileName.textContent = `Selected: ${file.name}`;

    showToast("Resume selected successfully");
});


// ============================
// ANALYZE RESUME
// ============================

analyzeBtn.addEventListener("click", () => {

    const hasFile = resumeFile.files.length > 0;
    const hasText = resumeText.value.trim().length > 0;

    if (!hasFile && !hasText) {

        showToast("Upload a resume or paste your resume text first.");

        return;
    }

    analyzeBtn.disabled = true;

    analyzeBtn.innerHTML = `
        Analyzing...
        <span>⌛</span>
    `;


    let score = 78;

    // Simple front-end simulation based on input length

    if (hasText) {

        const words = resumeText.value.trim().split(/\s+/).length;

        if (words > 80) {
            score += 5;
        }

        if (words > 180) {
            score += 4;
        }

        if (resumeText.value.toLowerCase().includes("skills")) {
            score += 2;
        }

        if (resumeText.value.toLowerCase().includes("experience")) {
            score += 2;
        }
    }

    score = Math.min(score, 96);


    setTimeout(() => {

        animateScore(score);

        analyzeBtn.disabled = false;

        analyzeBtn.innerHTML = `
            Analyze Again
            <span>→</span>
        `;

        showToast("Resume analysis completed.");

    }, 1200);
});


// ============================
// SCORE ANIMATION
// ============================

function animateScore(targetScore) {

    let current = 0;

    const interval = setInterval(() => {

        current += 1;

        scoreValue.textContent = current;

        progressFill.style.width = `${current}%`;

        if (current >= targetScore) {
            clearInterval(interval);
        }

    }, 15);
}


// ============================
// TOAST
// ============================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}


// ============================
// SCROLL REVEAL
// ============================

const revealElements = document.querySelectorAll(
    ".feature-card, .tip-card, .step, .insight-content, .upload-card, .result-card"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);
});


// ============================
// KEYBOARD SHORTCUT
// ============================

document.addEventListener("keydown", event => {

    if (
        event.key.toLowerCase() === "r" &&
        !event.ctrlKey &&
        !event.altKey &&
        document.activeElement.tagName !== "TEXTAREA" &&
        document.activeElement.tagName !== "INPUT"
    ) {
        document.getElementById("checker").scrollIntoView({
            behavior: "smooth"
        });
    }

});