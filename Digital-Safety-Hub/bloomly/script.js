/* =========================================================
   BLOOMLY
   Interactive JavaScript
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const body = document.body;

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const themeBtn = document.getElementById("themeBtn");

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

const newsletterForm = document.getElementById("newsletterForm");


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = {
    "Blush Garden": {
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=85"
    },

    "Sunshine Mix": {
        price: 1799,
        image:
            "https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=600&q=85"
    },

    "Forever Roses": {
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=600&q=85"
    },

    "Pure Elegance": {
        price: 2299,
        image:
            "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=600&q=85"
    }
};


/* =========================================================
   CART
   ========================================================= */

let cart = [];


function updateCart() {

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your basket is empty</h3>

                <p>
                    Add a beautiful bouquet to get started.
                </p>

            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;

        const element = document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <span>₹${item.price.toLocaleString("en-IN")}</span>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
                title="Remove"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(element);

    });


    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");


    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            const removed = cart[index];

            cart.splice(index, 1);

            updateCart();

            showToast(
                "Removed from bag",
                `${removed.name} was removed.`
            );

        });

    });

}


/* =========================================================
   ADD TO CART
   ========================================================= */

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.product;

        const product = products[productName];

        cart.push({
            name: productName,
            price: product.price,
            image: product.image
        });

        updateCart();

        showToast(
            "Added to your bag",
            `${productName} is ready for gifting.`
        );

    });

});


/* =========================================================
   CART OPEN / CLOSE
   ========================================================= */

function openCart() {

    cartPanel.classList.add("active");

    overlay.classList.add("active");

}

function closeCartPanel() {

    cartPanel.classList.remove("active");

    overlay.classList.remove("active");

}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

overlay.addEventListener("click", closeCartPanel);


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

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

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   DARK MODE
   ========================================================= */

const savedTheme = localStorage.getItem("bloomly-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-regular fa-sun"></i>';

}


themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    const darkMode =
        body.classList.contains("dark");

    localStorage.setItem(
        "bloomly-theme",
        darkMode ? "dark" : "light"
    );


    themeBtn.innerHTML = darkMode
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';

});


/* =========================================================
   SEARCH
   ========================================================= */

searchBtn.addEventListener("click", () => {

    searchPanel.classList.toggle("active");

    if (searchPanel.classList.contains("active")) {

        searchInput.focus();

    }

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

});


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const query =
            searchInput.value.trim();

        if (!query) {

            showToast(
                "Search",
                "Please enter something to search."
            );

            return;
        }


        showToast(
            "Searching Bloomly",
            `Looking for "${query}"...`
        );

    }

});


/* =========================================================
   HEART / WISHLIST
   ========================================================= */

document.querySelectorAll(".heart-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const icon =
            button.querySelector("i");

        const active =
            button.classList.contains("active");


        if (active) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            showToast(
                "Saved to favourites",
                `${button.dataset.product} was saved.`
            );

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            showToast(
                "Removed from favourites",
                `${button.dataset.product} was removed.`
            );

        }

    });

});


/* =========================================================
   OCCASION CARDS
   ========================================================= */

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        showToast(
            category,
            `Showing beautiful gifts for ${category.toLowerCase()}.`
        );

        document
            .getElementById("collections")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================================
   SURPRISE ME
   ========================================================= */

const surpriseBtn =
    document.getElementById("surpriseBtn");

const surpriseProducts = [
    "Blush Garden",
    "Sunshine Mix",
    "Forever Roses",
    "Pure Elegance"
];


surpriseBtn.addEventListener("click", () => {

    const randomProduct =
        surpriseProducts[
            Math.floor(
                Math.random() *
                surpriseProducts.length
            )
        ];

    showToast(
        "Bloomly picked for you",
        `Try ${randomProduct} today.`
    );

    document
        .getElementById("collections")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================================
   VIEW ALL
   ========================================================= */

document
    .getElementById("viewAllBtn")
    .addEventListener("click", () => {

        showToast(
            "Bloomly collection",
            "You're already viewing our featured collection."
        );

    });


/* =========================================================
   STORY BUTTON
   ========================================================= */

document
    .getElementById("storyBtn")
    .addEventListener("click", () => {

        showToast(
            "Welcome to Bloomly",
            "Thoughtful flowers for meaningful moments."
        );

    });


/* =========================================================
   CTA
   ========================================================= */

document
    .getElementById("ctaBtn")
    .addEventListener("click", () => {

        document
            .getElementById("collections")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================================
   CHECKOUT
   ========================================================= */

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast(
                "Your bag is empty",
                "Add a flower arrangement before checkout."
            );

            return;
        }


        showToast(
            "Checkout",
            "Checkout demo opened successfully."
        );

    });


/* =========================================================
   NEWSLETTER
   ========================================================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.getElementById("emailInput").value.trim();


    if (!email) {

        return;

    }


    showToast(
        "You're in!",
        "Bloomly updates will arrive in your inbox."
    );


    newsletterForm.reset();

});


/* =========================================================
   FOOTER LINKS
   ========================================================= */

document
    .querySelectorAll("[data-footer]")
    .forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showToast(
                link.dataset.footer,
                "This section is part of the Bloomly demo."
            );

        });

    });


/* =========================================================
   TOAST
   ========================================================= */

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


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener("keydown", event => {

    /* Press / to search */

    if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        event.preventDefault();

        searchPanel.classList.add("active");

        searchInput.focus();

    }


    /* Escape closes panels */

    if (event.key === "Escape") {

        searchPanel.classList.remove("active");

        closeCartPanel();

    }

});


/* =========================================================
   INITIALIZE
   ========================================================= */

updateCart();