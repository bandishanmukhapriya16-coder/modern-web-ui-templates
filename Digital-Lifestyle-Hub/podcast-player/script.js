/* =========================================================
   ECHOPOD - PODCAST PLAYER
   SCRIPT.JS
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

const audio = document.getElementById("audioElement");

const mainPlay = document.getElementById("mainPlay");

const playerTitle = document.getElementById("playerTitle");

const playerPodcast = document.getElementById("playerPodcast");

const currentTimeDisplay =
    document.getElementById("currentTime");

const durationDisplay =
    document.getElementById("duration");

const progressBar =
    document.getElementById("progressBar");

const speedText =
    document.getElementById("speedText");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const backToTop =
    document.getElementById("backToTop");


/* =========================================================
   SAMPLE AUDIO
========================================================= */

/*
   This is a public sample audio file used so that
   the podcast player can demonstrate real playback.

   You can replace this URL later with your own
   podcast audio file.
*/

const sampleAudio =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem("echopod-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeIcon) {
        themeIcon.textContent = "☀";
    }

}


/* =========================================================
   DARK MODE
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "echopod-theme",
            darkMode ? "dark" : "light"
        );

        if (themeIcon) {

            themeIcon.textContent =
                darkMode ? "☀" : "☾";

        }

    });

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    if (!isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0")
    );

}


/* =========================================================
   PLAY EPISODE
========================================================= */

function playEpisode(title, podcast) {

    if (!audio) {
        return;
    }


    /*
       If another episode is selected,
       load the sample audio again.
    */

    audio.src = sampleAudio;

    audio.load();


    playerTitle.textContent = title;

    playerPodcast.textContent = podcast;


    /*
       Start playback after loading.
    */

    audio.play()
        .then(() => {

            updatePlayButton(true);

        })
        .catch(() => {

            /*
               Some browsers require a direct
               user interaction before audio playback.
            */

            updatePlayButton(false);

        });

}


/* =========================================================
   FEATURED EPISODE
========================================================= */

function playFeaturedEpisode() {

    playEpisode(
        "The Art of Starting Again",
        "Mindful Minutes"
    );

}


/* =========================================================
   TOGGLE AUDIO
========================================================= */

function toggleAudio() {

    if (!audio.src) {

        playFeaturedEpisode();

        return;
    }


    if (audio.paused) {

        audio.play()
            .then(() => {

                updatePlayButton(true);

            })
            .catch(() => {

                updatePlayButton(false);

            });

    } else {

        audio.pause();

        updatePlayButton(false);

    }

}


/* =========================================================
   UPDATE PLAY BUTTON
========================================================= */

function updatePlayButton(isPlaying) {

    if (!mainPlay) {
        return;
    }

    mainPlay.textContent =
        isPlaying ? "Ⅱ" : "▶";

}


/* =========================================================
   AUDIO PLAY EVENT
========================================================= */

if (audio) {

    audio.addEventListener("play", () => {

        updatePlayButton(true);

    });


    audio.addEventListener("pause", () => {

        updatePlayButton(false);

    });


    audio.addEventListener("ended", () => {

        updatePlayButton(false);

        if (progressBar) {
            progressBar.value = 0;
        }

        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = "0:00";
        }

    });

}


/* =========================================================
   AUDIO METADATA
========================================================= */

if (audio) {

    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (durationDisplay) {

                durationDisplay.textContent =
                    formatTime(audio.duration);

            }

        }
    );

}


/* =========================================================
   AUDIO TIME UPDATE
========================================================= */

if (audio) {

    audio.addEventListener(
        "timeupdate",
        () => {

            if (!audio.duration) {
                return;
            }


            const progress =
                (audio.currentTime /
                    audio.duration) * 100;


            if (progressBar) {

                progressBar.value =
                    progress;

            }


            if (currentTimeDisplay) {

                currentTimeDisplay.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }

        }
    );

}


/* =========================================================
   PROGRESS BAR
========================================================= */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        () => {

            if (!audio.duration) {
                return;
            }


            const newTime =
                (progressBar.value / 100) *
                audio.duration;


            audio.currentTime =
                newTime;

        }
    );

}


/* =========================================================
   SKIP BACKWARD - 15 SECONDS
========================================================= */

function skipBackward() {

    if (!audio) {
        return;
    }

    audio.currentTime =
        Math.max(
            0,
            audio.currentTime - 15
        );

}


/* =========================================================
   SKIP FORWARD - 30 SECONDS
========================================================= */

function skipForward() {

    if (!audio) {
        return;
    }

    audio.currentTime =
        Math.min(
            audio.duration || Infinity,
            audio.currentTime + 30
        );

}


/* =========================================================
   PLAYBACK SPEED
========================================================= */

const playbackSpeeds = [
    1,
    1.25,
    1.5,
    1.75,
    2
];

let speedIndex = 0;


function changeSpeed() {

    speedIndex++;

    if (speedIndex >= playbackSpeeds.length) {
        speedIndex = 0;
    }


    const speed =
        playbackSpeeds[speedIndex];


    if (audio) {
        audio.playbackRate = speed;
    }


    if (speedText) {
        speedText.textContent =
            speed + "x";
    }

}


/* =========================================================
   MUTE / UNMUTE
========================================================= */

function toggleMute() {

    if (!audio) {
        return;
    }

    audio.muted =
        !audio.muted;

}


/* =========================================================
   SAVE EPISODE
========================================================= */

function saveEpisode(button) {

    if (!button) {
        return;
    }


    button.classList.toggle("saved");


    if (button.classList.contains("saved")) {

        button.textContent = "♥";

        button.style.color =
            "var(--accent)";

        button.style.borderColor =
            "var(--accent)";

    } else {

        button.textContent = "♡";

        button.style.color =
            "";

        button.style.borderColor =
            "";

    }

}


/* =========================================================
   SEARCH PODCASTS
========================================================= */

function searchPodcasts() {

    const searchInput =
        document.getElementById(
            "podcastSearch"
        );

    if (!searchInput) {
        return;
    }


    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const episodeCards =
        document.querySelectorAll(
            ".episode-card"
        );


    if (!searchTerm) {

        episodeCards.forEach(
            card => {
                card.style.display = "";
            }
        );

        return;

    }


    episodeCards.forEach(card => {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(searchTerm)) {

            card.style.display = "grid";

        } else {

            card.style.display = "none";

        }

    });


    const episodesSection =
        document.getElementById(
            "episodes"
        );


    if (episodesSection) {

        episodesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   SEARCH WITH ENTER KEY
========================================================= */

const searchInput =
    document.getElementById(
        "podcastSearch"
    );

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                searchPodcasts();

            }

        }
    );

}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

const filters =
    document.querySelectorAll(
        ".filter"
    );


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            filter.classList.add(
                "active"
            );


            const selected =
                filter.textContent
                    .trim()
                    .toLowerCase();


            const cards =
                document.querySelectorAll(
                    ".episode-card"
                );


            cards.forEach(card => {

                if (
                    selected === "all"
                ) {

                    card.style.display =
                        "grid";

                    return;

                }


                const cardText =
                    card.textContent
                        .toLowerCase();


                if (
                    cardText.includes(
                        selected
                    )
                ) {

                    card.style.display =
                        "grid";

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

});


/* =========================================================
   SUBSCRIBE FORM
========================================================= */

const subscribeForm =
    document.getElementById(
        "subscribeForm"
    );


if (subscribeForm) {

    subscribeForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "subscribeEmail"
                );


            if (!email || !email.value) {
                return;
            }


            alert(
                "You're subscribed! 🎧\n\n" +
                "We'll send the latest EchoPod " +
                "recommendations to " +
                email.value
            );


            subscribeForm.reset();

        }
    );

}


/* =========================================================
   NAVIGATION
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
   BACK TO TOP
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(
        ".navbar"
    );


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
   PLAYER VISIBILITY
========================================================= */

function closePlayer() {

    const player =
        document.getElementById(
            "audioPlayer"
        );


    if (!player) {
        return;
    }


    player.style.display =
        "none";


    if (audio) {

        audio.pause();

        updatePlayButton(false);

    }

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           Space = Play / Pause
        */

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT"
        ) {

            event.preventDefault();

            toggleAudio();

        }


        /*
           Arrow Left = 15 seconds back
        */

        if (
            event.code === "ArrowLeft" &&
            event.target.tagName !== "INPUT"
        ) {

            skipBackward();

        }


        /*
           Arrow Right = 30 seconds forward
        */

        if (
            event.code === "ArrowRight" &&
            event.target.tagName !== "INPUT"
        ) {

            skipForward();

        }

    }
);


/* =========================================================
   INITIAL PLAYER STATE
========================================================= */

if (audio) {

    audio.volume = 1;

    audio.playbackRate = 1;

}

console.log(
    "🎧 EchoPod Podcast Player loaded successfully!"
);