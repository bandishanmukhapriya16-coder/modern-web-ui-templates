/* =========================================
   MYTHOS — MYTHOLOGY GUIDE
   JavaScript
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const body = document.body;
const navbar = document.getElementById("navbar");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const themeToggle = document.getElementById("themeToggle");
const loginBtn = document.getElementById("loginBtn");
const navExploreBtn = document.getElementById("navExploreBtn");

const heroSearch = document.getElementById("heroSearch");
const heroSearchBtn = document.getElementById("heroSearchBtn");

const viewStoriesBtn = document.getElementById("viewStoriesBtn");
const aboutExploreBtn = document.getElementById("aboutExploreBtn");

const storyModal = document.getElementById("storyModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalText = document.getElementById("modalText");
const modalAction = document.getElementById("modalAction");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const backTop = document.getElementById("backTop");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");


/* =========================================
   TOAST SYSTEM
========================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

function updateNavbar() {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backTop.classList.add("visible");
    } else {
        backTop.classList.remove("visible");
    }
}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "×";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";
    });
});


/* =========================================
   DARK MODE
========================================= */

const savedTheme = localStorage.getItem("mythos-theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀";
} else {
    themeToggle.textContent = "◐";
}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    if (isDark) {

        localStorage.setItem("mythos-theme", "dark");

        themeToggle.textContent = "☀";

        showToast("Dark mode enabled");

    } else {

        localStorage.setItem("mythos-theme", "light");

        themeToggle.textContent = "◐";

        showToast("Light mode enabled");
    }
});


/* =========================================
   SMOOTH SCROLL FUNCTION
========================================= */

function scrollToSection(selector) {

    const section = document.querySelector(selector);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================
   NAVIGATION BUTTONS
========================================= */

navExploreBtn.addEventListener("click", () => {

    scrollToSection("#explore");

    showToast("Explore the world of mythology");
});


loginBtn.addEventListener("click", () => {

    showToast("Sign in will be available soon");
});


aboutExploreBtn.addEventListener("click", () => {

    scrollToSection("#stories");

    showToast("Your mythology journey begins here");
});


/* =========================================
   HERO SEARCH
========================================= */

const searchDatabase = {

    "mahabharata": {
        title: "Mahabharata",
        category: "INDIAN EPIC",
        text:
            "The Mahabharata is one of the major Sanskrit epics of ancient India. It tells the story of the Kuru dynasty and the conflict between the Pandavas and Kauravas, while exploring themes such as duty, justice, loyalty and moral choices."
    },

    "ramayana": {
        title: "Ramayana",
        category: "INDIAN EPIC",
        text:
            "The Ramayana is a major Sanskrit epic traditionally attributed to Valmiki. It follows the story of Rama and explores themes including duty, devotion, courage and the responsibilities of individuals."
    },

    "greek gods": {
        title: "Greek Gods",
        category: "GREEK TRADITION",
        text:
            "Greek mythology includes a large group of gods, goddesses and legendary figures. Olympian deities such as Zeus, Athena and Apollo appear in many surviving Greek myths and literary traditions."
    },

    "norse mythology": {
        title: "Norse Mythology",
        category: "NORSE TRADITION",
        text:
            "Norse mythology preserves stories about gods, heroes and cosmic events through sources including the Poetic Edda and Prose Edda. Figures such as Odin, Thor and Loki are among its best-known characters."
    },

    "egyptian gods": {
        title: "Egyptian Gods",
        category: "EGYPTIAN TRADITION",
        text:
            "Ancient Egyptian religion included many deities with different roles and associations. Gods such as Isis, Osiris, Anubis and Ra appear in surviving religious texts, artwork and archaeological evidence."
    }

};


function performSearch() {

    const query = heroSearch.value.trim().toLowerCase();

    if (!query) {

        showToast("Enter a story, deity or mythology tradition");

        heroSearch.focus();

        return;
    }


    let result = searchDatabase[query];


    if (!result) {

        const matchingKey = Object.keys(searchDatabase)
            .find(key => key.includes(query) || query.includes(key));

        if (matchingKey) {
            result = searchDatabase[matchingKey];
        }
    }


    if (result) {

        openModal(
            result.title,
            result.category,
            result.text
        );

    } else {

        showToast(
            `No exact result for "${heroSearch.value}". Try a popular search.`
        );
    }
}


heroSearchBtn.addEventListener("click", performSearch);


heroSearch.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        performSearch();
    }
});


/* =========================================
   POPULAR SEARCH TAGS
========================================= */

document.querySelectorAll(".search-tag").forEach(tag => {

    tag.addEventListener("click", () => {

        heroSearch.value = tag.textContent.trim();

        performSearch();
    });
});


/* =========================================
   TRADITION BUTTONS
========================================= */

document.querySelectorAll(".explore-tradition").forEach(button => {

    button.addEventListener("click", () => {

        const tradition = button.dataset.tradition;

        showToast(`Exploring ${tradition}`);

        scrollToSection("#figures");
    });
});


/* =========================================
   STORY DATA
========================================= */

const storyData = {

    "The Journey of Rama": {
        category: "INDIAN EPIC",
        text:
            "The Ramayana is a major Indian epic traditionally attributed to Valmiki. Its narrative follows Rama through exile, the search for Sita and the conflict with Ravana. The story has many regional and cultural interpretations across South and Southeast Asia."
    },

    "The Odyssey": {
        category: "GREEK EPIC",
        text:
            "The Odyssey is an ancient Greek epic traditionally attributed to Homer. It follows Odysseus on his long journey home after the Trojan War, encountering challenges, mythical beings and unfamiliar lands along the way."
    },

    "Ragnarök": {
        category: "NORSE LEGEND",
        text:
            "Ragnarök is a series of events described in Norse mythological sources involving a great conflict, the deaths of several gods and the transformation of the world. Different interpretations emphasize destruction, renewal and the continuation of life."
    }

};


/* =========================================
   MODAL
========================================= */

function openModal(title, category, text) {

    modalTitle.textContent = title;

    modalCategory.textContent = category;

    modalText.textContent = text;

    storyModal.classList.add("show");

    body.style.overflow = "hidden";
}


function closeModal() {

    storyModal.classList.remove("show");

    body.style.overflow = "";
}


document.querySelectorAll(".read-btn").forEach(button => {

    button.addEventListener("click", () => {

        const storyName = button.dataset.story;

        const story = storyData[storyName];

        if (!story) {
            return;
        }

        openModal(
            storyName,
            story.category,
            story.text
        );
    });
});


modalClose.addEventListener("click", closeModal);


document.querySelector(".modal-overlay").addEventListener(
    "click",
    closeModal
);


modalAction.addEventListener("click", () => {

    closeModal();

    scrollToSection("#figures");

    showToast("Continue discovering legendary figures");
});


/* =========================================
   ESCAPE KEY — CLOSE MODAL
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";
    }
});


/* =========================================
   VIEW ALL STORIES
========================================= */

viewStoriesBtn.addEventListener("click", () => {

    scrollToSection("#stories");

    showToast("You are viewing the featured stories");
});


/* =========================================
   FAVORITE STORIES
========================================= */

document.querySelectorAll(".favorite-btn").forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        button.classList.toggle("saved");

        if (button.classList.contains("saved")) {

            button.textContent = "♥";

            showToast("Story saved to your collection");

        } else {

            button.textContent = "♡";

            showToast("Story removed from your collection");
        }
    });
});


/* =========================================
   FIGURE FILTERS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const figureCards =
    document.querySelectorAll(".figure-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;


        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        figureCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");
            }
        });


        const filterName =
            selectedFilter === "all"
                ? "all legendary figures"
                : `${selectedFilter} figures`;

        showToast(`Showing ${filterName}`);
    });
});


/* =========================================
   FIGURE INFORMATION
========================================= */

const figureData = {

    Krishna: {
        category: "INDIAN TRADITION",
        text:
            "Krishna is a central figure in Hindu traditions and appears prominently in the Mahabharata, Bhagavad Gita and many other texts and devotional traditions."
    },

    Rama: {
        category: "INDIAN TRADITION",
        text:
            "Rama is the central figure of the Ramayana and is widely revered within Hindu traditions. The story of Rama has also developed into many regional versions."
    },

    Zeus: {
        category: "GREEK TRADITION",
        text:
            "Zeus is one of the principal Olympian gods in Greek mythology and is associated with the sky, thunder and authority among the gods."
    },

    Athena: {
        category: "GREEK TRADITION",
        text:
            "Athena is a major Greek goddess associated with wisdom, strategic warfare, crafts and the city of Athens."
    },

    Thor: {
        category: "NORSE TRADITION",
        text:
            "Thor is a prominent Norse god associated with thunder, strength and protection. He is strongly associated with the hammer Mjölnir."
    },

    Odin: {
        category: "NORSE TRADITION",
        text:
            "Odin is a major Norse god associated with wisdom, knowledge, poetry, magic and warfare."
    },

    Anubis: {
        category: "EGYPTIAN TRADITION",
        text:
            "Anubis is an ancient Egyptian deity associated with funerary practices, embalming and the protection of the dead."
    },

    Isis: {
        category: "EGYPTIAN TRADITION",
        text:
            "Isis was an important ancient Egyptian goddess associated with motherhood, magic, protection and healing."
    }

};


document.querySelectorAll(".figure-more").forEach(button => {

    button.addEventListener("click", () => {

        const figureName = button.dataset.figure;

        const figure = figureData[figureName];

        if (!figure) {
            return;
        }

        openModal(
            figureName,
            figure.category,
            figure.text
        );
    });
});


/* =========================================
   EPIC TIMELINE INTERACTION
========================================= */

document.querySelectorAll(".timeline-item").forEach(item => {

    item.addEventListener("click", () => {

        document
            .querySelectorAll(".timeline-item")
            .forEach(timelineItem => {
                timelineItem.classList.remove("active");
            });

        item.classList.add("active");

    });
});


/* =========================================
   FESTIVAL BUTTONS
========================================= */

const festivalInformation = {

    Diwali:
        "Diwali is a major festival celebrated across India and by communities around the world. Its stories, practices and meanings vary between regions and traditions.",

    Panathenaia:
        "The Panathenaia was an important ancient Athenian festival associated with Athena. It included religious ceremonies, competitions and civic celebrations.",

    Yule:
        "Yule refers to a winter festival tradition associated with pre-Christian Germanic and Norse cultures and later historical traditions."
};


document.querySelectorAll(".festival-btn").forEach(button => {

    button.addEventListener("click", () => {

        const festival = button.dataset.festival;

        openModal(
            festival,
            "CULTURAL TRADITION",
            festivalInformation[festival]
        );
    });
});


/* =========================================
   NEWSLETTER
========================================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = emailInput.value.trim();


    if (!email) {

        showToast("Please enter your email address");

        return;
    }


    if (!email.includes("@") || !email.includes(".")) {

        showToast("Please enter a valid email address");

        emailInput.focus();

        return;
    }


    showToast("You're subscribed to The Mythos Letter");

    newsletterForm.reset();
});


/* =========================================
   FOOTER ACTIONS
========================================= */

const contactBtn = document.getElementById("contactBtn");
const feedbackBtn = document.getElementById("feedbackBtn");
const privacyBtn = document.getElementById("privacyBtn");


contactBtn.addEventListener("click", () => {

    showToast("Contact information will be available soon");
});


feedbackBtn.addEventListener("click", () => {

    showToast("Feedback form will be available soon");
});


privacyBtn.addEventListener("click", () => {

    showToast("Privacy information will be available soon");
});


/* =========================================
   BACK TO TOP
========================================= */

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");
        }
    });


    navigationLinks.forEach(link => {

        link.style.color = "";

        const target =
            link.getAttribute("href").replace("#", "");

        if (target === currentSection) {
            link.style.color = "var(--accent)";
        }
    });
}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================
   KEYBOARD SHORTCUT
========================================= */

document.addEventListener("keydown", event => {

    /*
       Press "/" anywhere on the page
       to focus the mythology search.
    */

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        event.preventDefault();

        heroSearch.focus();

        showToast("Search is ready");
    }

});


/* =========================================
   IMAGE FALLBACK
========================================= */

document.querySelectorAll(".tradition-image, .story-image, .about-image")
    .forEach(element => {

        element.addEventListener("error", () => {

            element.style.backgroundImage =
                "linear-gradient(135deg, #3b2a1d, #17120e)";
        });
    });


/* =========================================
   INITIAL WELCOME
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast(
            "Welcome to Mythos — explore stories that shaped civilizations."
        );

    }, 900);

});


/* =========================================
   CONSOLE STATUS
========================================= */

console.log(
    "✓ Mythos — Mythology Guide loaded successfully."
);