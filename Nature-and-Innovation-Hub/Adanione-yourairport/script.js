/* =========================================
   ADANI ONE — YOUR AIRPORT
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const navbar = document.getElementById("navbar");
    const navLinks = document.getElementById("navLinks");
    const menuBtn = document.getElementById("menuBtn");

    const themeToggle = document.getElementById("themeToggle");
    const loginBtn = document.getElementById("loginBtn");

    const checkFlightBtn = document.getElementById("checkFlightBtn");
    const exploreAirportBtn = document.getElementById("exploreAirportBtn");

    const searchTabs = document.querySelectorAll(".search-tab");

    const flightSearchContent =
        document.getElementById("flightSearchContent");

    const routeSearchContent =
        document.getElementById("routeSearchContent");

    const searchFlightBtn =
        document.getElementById("searchFlightBtn");

    const searchRouteBtn =
        document.getElementById("searchRouteBtn");

    const flightNumber =
        document.getElementById("flightNumber");

    const flightDate =
        document.getElementById("flightDate");

    const fromAirport =
        document.getElementById("fromAirport");

    const toAirport =
        document.getElementById("toAirport");

    const routeSwap =
        document.getElementById("routeSwap");

    const flightResult =
        document.getElementById("flightResult");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultMessage =
        document.getElementById("resultMessage");

    const closeResult =
        document.getElementById("closeResult");

    const serviceActions =
        document.querySelectorAll(".service-action");

    const journeyBtn =
        document.getElementById("journeyBtn");

    const checkinBtn =
        document.getElementById("checkinBtn");

    const offerActions =
        document.querySelectorAll(".offer-action");

    const allOffersBtn =
        document.getElementById("allOffersBtn");

    const googlePlayBtn =
        document.getElementById("googlePlayBtn");

    const appStoreBtn =
        document.getElementById("appStoreBtn");

    const footerActions =
        document.querySelectorAll(".footer-action");

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastClose =
        document.getElementById("toastClose");

    const backTop =
        document.getElementById("backTop");


    /* =========================================
       TOAST SYSTEM
    ========================================= */

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


    toastClose.addEventListener("click", () => {
        toast.classList.remove("show");
    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen =
            navLinks.classList.contains("open");

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        const spans =
            menuBtn.querySelectorAll("span");

        if (isOpen) {

            spans[0].style.transform =
                "rotate(45deg) translate(5px, 5px)";

            spans[1].style.opacity = "0";

            spans[2].style.transform =
                "rotate(-45deg) translate(5px, -5px)";

        } else {

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";
        }
    });


    /* Close mobile menu after navigation */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const spans =
                menuBtn.querySelectorAll("span");

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";
        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    function handleNavbar() {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    /* =========================================
       DARK MODE
    ========================================= */

    const savedTheme =
        localStorage.getItem("adani-one-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "adani-one-theme",
            isDark ? "dark" : "light"
        );

        showToast(
            isDark ? "Dark mode enabled" : "Light mode enabled",
            isDark
                ? "The airport dashboard is now easier on the eyes."
                : "The light theme is back."
        );
    });


    /* =========================================
       NAVIGATION HELPERS
    ========================================= */

    function scrollToSection(id) {

        const section =
            document.getElementById(id);

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    }


    /* =========================================
       HERO BUTTONS
    ========================================= */

    checkFlightBtn.addEventListener("click", () => {

        scrollToSection("flights");

        setTimeout(() => {

            flightNumber.focus();

        }, 600);
    });


    exploreAirportBtn.addEventListener("click", () => {

        scrollToSection("services");

        showToast(
            "Airport services",
            "Explore parking, lounges, dining, shopping and transport."
        );
    });


    /* =========================================
       SEARCH TABS
    ========================================= */

    searchTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            searchTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const selectedTab =
                tab.dataset.tab;

            if (selectedTab === "flight") {

                flightSearchContent.classList.remove("hidden");

                routeSearchContent.classList.add("hidden");

            } else {

                routeSearchContent.classList.remove("hidden");

                flightSearchContent.classList.add("hidden");
            }

            flightResult.classList.remove("show");
        });

    });


    /* =========================================
       SET TODAY'S DATE
    ========================================= */

    const today =
        new Date().toISOString().split("T")[0];

    if (flightDate) {
        flightDate.value = today;
    }


    /* =========================================
       FLIGHT SEARCH
    ========================================= */

    function searchFlight() {

        const enteredFlight =
            flightNumber.value.trim().toUpperCase();

        if (!enteredFlight) {

            showToast(
                "Flight number required",
                "Please enter a flight number such as AI 302."
            );

            flightNumber.focus();

            return;
        }


        searchFlightBtn.disabled = true;

        searchFlightBtn.innerHTML =
            "Searching...";


        setTimeout(() => {

            searchFlightBtn.disabled = false;

            searchFlightBtn.innerHTML =
                'Search flight <span>→</span>';


            resultTitle.textContent =
                `${enteredFlight} — Flight found`;

            resultMessage.textContent =
                "Your flight is scheduled. Current status: On time.";

            flightResult.classList.add("show");

            showToast(
                "Flight found",
                `${enteredFlight} is currently showing as on time.`
            );

        }, 900);
    }


    searchFlightBtn.addEventListener(
        "click",
        searchFlight
    );


    flightNumber.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                searchFlight();
            }

        }
    );


    /* =========================================
       ROUTE SEARCH
    ========================================= */

    searchRouteBtn.addEventListener("click", () => {

        const from =
            fromAirport.options[
                fromAirport.selectedIndex
            ].text;

        const to =
            toAirport.options[
                toAirport.selectedIndex
            ].text;


        if (fromAirport.value === toAirport.value) {

            showToast(
                "Choose different airports",
                "Departure and destination cannot be the same."
            );

            return;
        }


        searchRouteBtn.disabled = true;

        searchRouteBtn.innerHTML =
            "Finding flights...";


        setTimeout(() => {

            searchRouteBtn.disabled = false;

            searchRouteBtn.innerHTML =
                'Find flights <span>→</span>';


            resultTitle.textContent =
                `${from} → ${to}`;

            resultMessage.textContent =
                "Several flight options are available for this route.";

            flightResult.classList.add("show");

            showToast(
                "Flights found",
                `Available flights from ${from} to ${to}.`
            );

        }, 900);

    });


    /* =========================================
       ROUTE SWAP
    ========================================= */

    routeSwap.addEventListener("click", () => {

        const currentFrom =
            fromAirport.value;

        fromAirport.value =
            toAirport.value;

        toAirport.value =
            currentFrom;

        showToast(
            "Route switched",
            "Departure and destination have been swapped."
        );

    });


    /* =========================================
       CLOSE SEARCH RESULT
    ========================================= */

    closeResult.addEventListener("click", () => {

        flightResult.classList.remove("show");

    });


    /* =========================================
       SERVICE ACTIONS
    ========================================= */

    const serviceMessages = {

        parking: {
            title: "Smart Parking",
            message: "Parking reservation flow is ready to explore."
        },

        lounge: {
            title: "Airport Lounge",
            message: "Browse premium lounge options before your flight."
        },

        dining: {
            title: "Food & Dining",
            message: "Discover restaurants and cafes across the terminal."
        },

        shopping: {
            title: "Airport Shopping",
            message: "Explore duty-free stores and airport-exclusive offers."
        },

        transport: {
            title: "Cab & Transport",
            message: "Airport transfer booking is ready to explore."
        }

    };


    serviceActions.forEach(button => {

        button.addEventListener("click", () => {

            const service =
                button.dataset.service;

            const info =
                serviceMessages[service];

            if (!info) return;

            showToast(
                info.title,
                info.message
            );

        });

    });


    /* =========================================
       JOURNEY BUTTON
    ========================================= */

    journeyBtn.addEventListener("click", () => {

        showToast(
            "Journey planner",
            "Your personalised airport journey can be planned here."
        );

    });


    /* =========================================
       CHECK-IN BUTTON
    ========================================= */

    checkinBtn.addEventListener("click", () => {

        showToast(
            "Online check-in",
            "Check-in flow opened. Enter your booking details to continue."
        );

    });


    /* =========================================
       OFFER ACTIONS
    ========================================= */

    offerActions.forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Travel offer",
                "More airport offers will appear here."
            );

        });

    });


    allOffersBtn.addEventListener("click", () => {

        showToast(
            "All offers",
            "Showing the latest airport shopping, dining and lounge deals."
        );

    });


    /* =========================================
       APP STORE BUTTONS
    ========================================= */

    googlePlayBtn.addEventListener("click", () => {

        showToast(
            "Google Play",
            "The Adani One app download page would open here."
        );

    });


    appStoreBtn.addEventListener("click", () => {

        showToast(
            "App Store",
            "The Adani One app download page would open here."
        );

    });


    /* =========================================
       FOOTER ACTIONS
    ========================================= */

    footerActions.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const title =
                link.textContent.trim();

            showToast(
                title,
                `${title} information would open here.`
            );

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

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.id;
            }

        });


        navigationLinks.forEach(link => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =========================================
       BACK TO TOP
    ========================================= */

    function updateBackTop() {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackTop
    );


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navLinks.classList.remove("open");

            flightResult.classList.remove("show");

        }

    });


    /* =========================================
       KEYBOARD SHORTCUT
    ========================================= */

    document.addEventListener("keydown", event => {

        const activeElement =
            document.activeElement;

        const isTyping =
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.tagName === "SELECT"
            );


        if (isTyping) return;


        if (event.key.toLowerCase() === "f") {

            scrollToSection("flights");

            setTimeout(() => {
                flightNumber.focus();
            }, 500);

        }

    });


    /* =========================================
       IMAGE FALLBACK
    ========================================= */

    document.querySelectorAll("[style]").forEach(element => {

        element.addEventListener("error", () => {

            element.style.backgroundImage = "none";

        });

    });


    /* =========================================
       BUTTON LOADING STATE
    ========================================= */

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("mouseenter", () => {

            if (!button.disabled) {
                button.style.webkitTapHighlightColor =
                    "transparent";
            }

        });

    });


    /* =========================================
       INITIAL PAGE MESSAGE
    ========================================= */

    console.log(
        "Adani One — Your Airport UI loaded successfully."
    );

});