/* =========================================================
   POLOPAN - SMART WARDROBE
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const addItemModal =
    document.getElementById("addItemModal");

const addItemForm =
    document.getElementById("addItemForm");

const wardrobeGrid =
    document.querySelector(".wardrobe-grid");

const backToTop =
    document.getElementById("backToTop");


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem("polopan-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeIcon) {

        themeIcon.textContent = "☀";

    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "polopan-theme",
            isDark ? "dark" : "light"
        );


        if (themeIcon) {

            themeIcon.textContent =
                isDark ? "☀" : "☾";

        }

    });

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function showToast(title, message) {

    if (!toast) {

        return;

    }


    if (toastTitle) {

        toastTitle.textContent = title;

    }


    if (toastMessage) {

        toastMessage.textContent = message;

    }


    toast.classList.add("show");


    clearTimeout(window.polopanToastTimer);


    window.polopanToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =========================================================
   FAVORITE BUTTONS
========================================================= */

function toggleFavorite(button) {

    if (!button) {

        return;

    }


    button.classList.toggle("active");


    if (button.classList.contains("active")) {

        button.textContent = "♥";


        showToast(
            "Added to favorites",
            "This item has been saved to your favorite pieces."
        );

    } else {

        button.textContent = "♡";


        showToast(
            "Removed from favorites",
            "The item was removed from your favorite pieces."
        );

    }

}


/* =========================================================
   WARDROBE FILTERS
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");


function applyWardrobeFilter(filter) {

    const clothingCards =
        document.querySelectorAll(".clothing-card");


    clothingCards.forEach(card => {

        const category =
            card.dataset.category;


        if (
            filter === "all" ||
            category === filter
        ) {

            card.style.display = "";

            requestAnimationFrame(() => {

                card.style.opacity = "1";

            });

        } else {

            card.style.opacity = "0";

            setTimeout(() => {

                if (card.style.opacity === "0") {

                    card.style.display = "none";

                }

            }, 180);

        }

    });

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;


        applyWardrobeFilter(selectedFilter);

    });

});


/* =========================================================
   ADD ITEM MODAL
========================================================= */

function openAddItem() {

    if (!addItemModal) {

        return;

    }


    addItemModal.classList.add("show");

    document.body.classList.add("modal-open");


    const itemName =
        document.getElementById("itemName");


    if (itemName) {

        setTimeout(() => {

            itemName.focus();

        }, 200);

    }

}


function closeAddItem() {

    if (!addItemModal) {

        return;

    }


    addItemModal.classList.remove("show");

    document.body.classList.remove("modal-open");

}


/* =========================================================
   CLOSE MODAL OUTSIDE
========================================================= */

if (addItemModal) {

    addItemModal.addEventListener("click", event => {

        if (event.target === addItemModal) {

            closeAddItem();

        }

    });

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeAddItem();

    }

});


/* =========================================================
   ADD NEW WARDROBE ITEM
========================================================= */

if (addItemForm) {

    addItemForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const itemNameInput =
                document.getElementById("itemName");


            const itemCategoryInput =
                document.getElementById("itemCategory");


            if (
                !itemNameInput ||
                !itemCategoryInput
            ) {

                return;

            }


            const itemName =
                itemNameInput.value.trim();


            const itemCategory =
                itemCategoryInput.value;


            if (!itemName) {

                showToast(
                    "Missing information",
                    "Please enter an item name."
                );

                return;

            }


            createWardrobeItem(
                itemName,
                itemCategory
            );


            addItemForm.reset();

            closeAddItem();


            showToast(
                "Item added",
                `${itemName} has been added to your wardrobe.`
            );

        }
    );

}


/* =========================================================
   CREATE NEW WARDROBE ITEM
========================================================= */

function createWardrobeItem(
    itemName,
    category
) {

    if (!wardrobeGrid) {

        return;

    }


    const card =
        document.createElement("article");


    card.className =
        "clothing-card";


    card.dataset.category =
        category;


    /* IMAGE */

    const image =
        document.createElement("div");


    image.className =
        "clothing-image";


    /*
       Real fashion image used for newly
       added wardrobe items.
    */

    const imageElement =
        document.createElement("img");


    const categoryImages = {

        tops:
            "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85",

        bottoms:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",

        shoes:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",

        accessories:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=85"

    };


    imageElement.src =
        categoryImages[category] ||
        categoryImages.tops;


    imageElement.alt =
        itemName;


    image.appendChild(imageElement);


    /* FAVORITE BUTTON */

    const favorite =
        document.createElement("button");


    favorite.className =
        "favorite";


    favorite.textContent =
        "♡";


    favorite.type =
        "button";


    favorite.setAttribute(
        "aria-label",
        `Add ${itemName} to favorites`
    );


    favorite.addEventListener(
        "click",
        () => {

            toggleFavorite(favorite);

        }
    );


    image.appendChild(favorite);


    /* DETAILS */

    const details =
        document.createElement("div");


    details.className =
        "clothing-details";


    const textContainer =
        document.createElement("div");


    const title =
        document.createElement("h3");


    title.textContent =
        itemName;


    const description =
        document.createElement("p");


    description.textContent =
        category.charAt(0).toUpperCase() +
        category.slice(1) +
        " · New item";


    textContainer.appendChild(title);

    textContainer.appendChild(description);


    const color =
        document.createElement("span");


    color.className =
        "item-color black";


    details.appendChild(textContainer);

    details.appendChild(color);


    card.appendChild(image);

    card.appendChild(details);


    wardrobeGrid.prepend(card);


    /* SHOW ALL */

    filterButtons.forEach(button => {

        button.classList.remove("active");

    });


    const allButton =
        document.querySelector(
            '.filter-button[data-filter="all"]'
        );


    if (allButton) {

        allButton.classList.add("active");

    }


    applyWardrobeFilter("all");

}


/* =========================================================
   GENERATE OUTFIT
========================================================= */

function generateOutfit() {

    const outfits = [

        {
            title: "Effortless Weekend",

            message:
                "A relaxed combination for a comfortable day out."
        },

        {
            title: "Modern Minimal",

            message:
                "Clean neutrals for a simple and polished look."
        },

        {
            title: "Smart Casual",

            message:
                "A balanced outfit for work, coffee or casual meetings."
        },

        {
            title: "Everyday Essential",

            message:
                "Comfortable basics styled for an easy everyday look."
        },

        {
            title: "City Ready",

            message:
                "A polished combination designed for an active day in the city."
        }

    ];


    const randomIndex =
        Math.floor(
            Math.random() * outfits.length
        );


    const selected =
        outfits[randomIndex];


    const title =
        document.querySelector(
            ".result-header h3"
        );


    const description =
        document.querySelector(
            ".result-footer > span"
        );


    if (title) {

        title.textContent =
            selected.title;

    }


    if (description) {

        description.textContent =
            selected.message;

    }


    showToast(
        "Outfit generated",
        "Polopan created a fresh look from your wardrobe."
    );

}


/* =========================================================
   SAVE OUTFIT
========================================================= */

function saveOutfit() {

    showToast(
        "Outfit saved",
        "This look has been added to your saved outfits."
    );

}


/* =========================================================
   VIEW OUTFIT
========================================================= */

function showOutfitMessage() {

    showToast(
        "Outfit opened",
        "Your selected outfit is ready to explore."
    );

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) {

            return;

        }


        if (window.scrollY > 30) {

            navbar.style.borderBottomColor =
                "var(--border)";

        } else {

            navbar.style.borderBottomColor =
                "transparent";

        }

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) {

            return;

        }


        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);


/* =========================================================
   CLOSE TOAST
========================================================= */

if (toast) {

    toast.addEventListener(
        "click",
        () => {

            toast.classList.remove("show");

        }
    );

}


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           Press "/" to quickly open the
           Add Item window.
        */

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA" &&
            document.activeElement.tagName !== "SELECT"
        ) {

            event.preventDefault();

            openAddItem();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

console.log(
    "✦ Polopan Smart Wardrobe loaded successfully!"
);