/* =========================================================
   NEARBYY
   Interactive Places Discovery App
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const body = document.body;

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const themeBtn = document.getElementById("themeBtn");

const locationBtn = document.getElementById("locationBtn");
const locationText = document.getElementById("locationText");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const categoryCards =
    document.querySelectorAll(".category-card");

const placeCards =
    document.querySelectorAll(".place-card");

const placesGrid =
    document.getElementById("placesGrid");

const sortSelect =
    document.getElementById("sortSelect");

const modal =
    document.getElementById("detailsModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalRating =
    document.getElementById("modalRating");

const modalDistance =
    document.getElementById("modalDistance");

const modalDescription =
    document.getElementById("modalDescription");

const modalSaveBtn =
    document.getElementById("modalSaveBtn");

const directionsBtn =
    document.getElementById("directionsBtn");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

let currentPlace = null;

let savedPlaces = [];


/* =========================================================
   PLACE DATA
   ========================================================= */

const placeData = {

    "The Daily Grind": {

        category: "Cafe",

        rating: "4.8",

        distance: "0.8 km",

        image:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",

        description:
            "Specialty coffee, fresh pastries and a relaxed space to work or meet."
    },


    "Olive & Ember": {

        category: "Restaurant",

        rating: "4.7",

        distance: "1.2 km",

        image:
            "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85",

        description:
            "Modern comfort food, seasonal ingredients and a warm neighbourhood atmosphere."
    },


    "The Old Town": {

        category: "Attraction",

        rating: "4.9",

        distance: "2.1 km",

        image:
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",

        description:
            "Historic streets, beautiful architecture and plenty of photo-worthy corners."
    },


    "Local Market": {

        category: "Shopping",

        rating: "4.6",

        distance: "1.5 km",

        image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",

        description:
            "Independent stores, fashion, lifestyle products and local brands."
    }

};


/* =========================================================
   MOBILE MENU
   ========================================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon =
        menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon =
            menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   DARK MODE
   ========================================================= */

const savedTheme =
    localStorage.getItem("nearbyy-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-regular fa-sun"></i>';

}


themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    localStorage.setItem(
        "nearbyy-theme",
        isDark ? "dark" : "light"
    );

    themeBtn.innerHTML = isDark
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';

});


/* =========================================================
   LOCATION
   ========================================================= */

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        showToast(
            "Location unavailable",
            "Your browser does not support location services."
        );

        return;

    }


    locationBtn.textContent = "Locating...";


    navigator.geolocation.getCurrentPosition(

        position => {

            const latitude =
                position.coords.latitude.toFixed(2);

            const longitude =
                position.coords.longitude.toFixed(2);

            locationText.textContent =
                `Near you · ${latitude}, ${longitude}`;

            locationBtn.textContent =
                "Located";

            showToast(
                "Location updated",
                "Nearbyy is now using your current location."
            );

        },

        () => {

            locationBtn.textContent =
                "Change";

            showToast(
                "Location permission needed",
                "Allow location access to personalize Nearbyy."
            );

        }

    );

});


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        categoryCards.forEach(item => {

            item.classList.remove("active");

        });

        card.classList.add("active");


        const category =
            card.dataset.category;


        placeCards.forEach(place => {

            if (
                category === "all" ||
                place.dataset.category === category
            ) {

                place.style.display = "";

            } else {

                place.style.display = "none";

            }

        });


        showToast(
            "Category selected",
            category === "all"
                ? "Showing all nearby places."
                : `Showing ${category} places.`
        );

    });

});


/* =========================================================
   SEARCH
   ========================================================= */

function performSearch(query) {

    const search =
        query.toLowerCase().trim();


    if (!search) {

        showToast(
            "Search nearby",
            "Type a place, category or experience."
        );

        return;

    }


    let matches = 0;


    placeCards.forEach(place => {

        const name =
            place.dataset.name.toLowerCase();

        const category =
            place.dataset.category.toLowerCase();

        const content =
            place.textContent.toLowerCase();


        if (
            name.includes(search) ||
            category.includes(search) ||
            content.includes(search)
        ) {

            place.style.display = "";

            matches++;

        } else {

            place.style.display = "none";

        }

    });


    document
        .getElementById("trending")
        .scrollIntoView({
            behavior: "smooth"
        });


    showToast(
        matches
            ? "Search complete"
            : "No places found",
        matches
            ? `${matches} place${matches > 1 ? "s" : ""} matched your search.`
            : `Nothing matched "${query}".`
    );

}


searchButton.addEventListener("click", () => {

    performSearch(searchInput.value);

});


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        performSearch(searchInput.value);

    }

});


/* =========================================================
   QUICK SEARCH
   ========================================================= */

document
    .querySelectorAll(".quick-search button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const value =
                button.dataset.search;

            searchInput.value = value;

            performSearch(value);

        });

    });


/* =========================================================
   SORTING
   ========================================================= */

sortSelect.addEventListener("change", () => {

    const cards =
        Array.from(placeCards);


    if (sortSelect.value === "rating") {

        cards.sort(
            (a, b) =>
                Number(b.dataset.rating) -
                Number(a.dataset.rating)
        );

    }


    if (sortSelect.value === "distance") {

        cards.sort(
            (a, b) =>
                Number(a.dataset.distance) -
                Number(b.dataset.distance)
        );

    }


    if (sortSelect.value === "recommended") {

        cards.sort(() => 0.5 - Math.random());

    }


    cards.forEach(card => {

        placesGrid.appendChild(card);

    });


    showToast(
        "Places sorted",
        "Your nearby results have been reorganized."
    );

});


/* =========================================================
   SAVE PLACES
   ========================================================= */

document
    .querySelectorAll(".save-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const placeName =
                button.dataset.place;

            const icon =
                button.querySelector("i");

            const isSaved =
                button.classList.toggle("active");


            if (isSaved) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                if (
                    !savedPlaces.includes(placeName)
                ) {

                    savedPlaces.push(placeName);

                }

                showToast(
                    "Saved",
                    `${placeName} was added to your collection.`
                );

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                savedPlaces =
                    savedPlaces.filter(
                        name => name !== placeName
                    );

                showToast(
                    "Removed",
                    `${placeName} was removed from your collection.`
                );

            }

        });

    });


/* =========================================================
   DETAILS MODAL
   ========================================================= */

document
    .querySelectorAll(".details-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            openDetails(button.dataset.place);

        });

    });


function openDetails(placeName) {

    const data =
        placeData[placeName];


    if (!data) {

        return;

    }


    currentPlace = placeName;


    modalImage.src =
        data.image;

    modalImage.alt =
        placeName;

    modalCategory.textContent =
        data.category;

    modalTitle.textContent =
        placeName;

    modalRating.textContent =
        data.rating;

    modalDistance.textContent =
        data.distance;

    modalDescription.textContent =
        data.description;


    updateModalSaveButton();


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeDetails() {

    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeDetails
);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeDetails();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeDetails();

    }

});


/* =========================================================
   MODAL SAVE
   ========================================================= */

function updateModalSaveButton() {

    const icon =
        modalSaveBtn.querySelector("i");


    const isSaved =
        savedPlaces.includes(currentPlace);


    if (isSaved) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        modalSaveBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i> Saved';

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        modalSaveBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i> Save';

    }

}


modalSaveBtn.addEventListener("click", () => {

    if (!currentPlace) {

        return;

    }


    const existingButton =
        document.querySelector(
            `.save-btn[data-place="${currentPlace}"]`
        );


    if (
        savedPlaces.includes(currentPlace)
    ) {

        savedPlaces =
            savedPlaces.filter(
                name => name !== currentPlace
            );

        if (existingButton) {

            existingButton.classList.remove(
                "active"
            );

            existingButton.querySelector("i")
                .className =
                "fa-regular fa-heart";

        }

        showToast(
            "Removed",
            `${currentPlace} was removed from your collection.`
        );

    } else {

        savedPlaces.push(currentPlace);

        if (existingButton) {

            existingButton.classList.add(
                "active"
            );

            existingButton.querySelector("i")
                .className =
                "fa-solid fa-heart";

        }

        showToast(
            "Saved",
            `${currentPlace} was added to your collection.`
        );

    }


    updateModalSaveButton();

});


/* =========================================================
   DIRECTIONS
   ========================================================= */

directionsBtn.addEventListener("click", () => {

    if (!currentPlace) {

        return;

    }


    const data =
        placeData[currentPlace];


    const query =
        encodeURIComponent(currentPlace);


    window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank"
    );


    showToast(
        "Opening directions",
        `Finding ${currentPlace} on Maps.`
    );

});


/* =========================================================
   MAP BUTTON
   ========================================================= */

document
    .getElementById("exploreMapBtn")
    .addEventListener("click", () => {

        showToast(
            "Map explorer",
            "Interactive map mode opened for this demo."
        );

    });


/* =========================================================
   SAVED BUTTON
   ========================================================= */

document
    .getElementById("savedBtn")
    .addEventListener("click", () => {

        if (savedPlaces.length === 0) {

            showToast(
                "No saved places",
                "Tap the heart on a place to save it."
            );

            return;

        }


        showToast(
            "Your saved places",
            `${savedPlaces.length} place${savedPlaces.length > 1 ? "s" : ""} in your collection.`
        );

    });


/* =========================================================
   START EXPLORING
   ========================================================= */

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        document
            .getElementById("trending")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================================
   VIEW ALL CATEGORIES
   ========================================================= */

document
    .getElementById("allCategoriesBtn")
    .addEventListener("click", () => {

        categoryCards.forEach(card => {

            card.classList.remove("active");

        });


        categoryCards[0]
            .classList.add("active");


        placeCards.forEach(card => {

            card.style.display = "";

        });


        showToast(
            "All categories",
            "Showing every nearby place."
        );

    });


/* =========================================================
   PROFILE
   ========================================================= */

document
    .getElementById("profileBtn")
    .addEventListener("click", () => {

        showToast(
            "Your Nearbyy profile",
            "Profile features are available in this demo."
        );

    });


/* =========================================================
   NEWSLETTER
   ========================================================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document
                .getElementById("emailInput")
                .value
                .trim();


        if (!email) {

            return;

        }


        showToast(
            "You're subscribed",
            "Nearby recommendations are coming your way."
        );


        event.target.reset();

    });


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(title, message) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3200);

}


/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
    "Nearbyy initialized successfully."
);