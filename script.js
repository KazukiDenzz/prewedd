/* =========================
   OPENING + MUSIC
========================= */

const openingScreen =
    document.getElementById("openingScreen");

const openInvitation =
    document.getElementById("openInvitation");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


openInvitation.addEventListener("click", function () {

    openingScreen.classList.add("hide");

    document.body.classList.add("invitation-open");

    weddingMusic
        .play()
        .then(function () {

            musicButton.classList.add("playing");

        })
        .catch(function (error) {

            console.log(
                "Musik tidak dapat dimainkan:",
                error
            );

        });

});


musicButton.addEventListener("click", function () {

    if (weddingMusic.paused) {

        weddingMusic
            .play()
            .then(function () {

                musicButton.classList.add("playing");

            });

    } else {

        weddingMusic.pause();

        musicButton.classList.remove("playing");

    }

});


/* =========================
   COUNTDOWN
========================= */

const weddingDate =
    new Date("December 12, 2026 08:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }


    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image =
            item.querySelector("img");

        lightboxImage.src =
            image.src;

        lightbox.classList.add("show");

    });

});


lightboxClose.addEventListener("click", function () {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

});


lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

        document.body.style.overflow = "";

    }

});


/* =========================
   RSVP WHATSAPP
========================= */

const rsvpForm =
    document.getElementById("rsvpForm");


rsvpForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* =========================
       AMBIL DATA FORM
    ========================= */

    const guestName =
        document.getElementById("guestName")
            .value
            .trim();


    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        );


    const guestCount =
        document.getElementById("guestCount")
            .value;


    const guestMessage =
        document.getElementById("guestMessage")
            .value
            .trim();


    /* =========================
       VALIDASI
    ========================= */

    if (!guestName) {

        alert(
            "Silakan masukkan nama Anda."
        );

        return;

    }


    if (!attendance) {

        alert(
            "Silakan pilih konfirmasi kehadiran."
        );

        return;

    }


    /* =========================
       NOMOR WHATSAPP
    ========================= */

    const whatsappNumber =
        "6285899640006";


    /* =========================
       BUAT PESAN
    ========================= */

    let message =
`Halo Raka & Ayu,

Saya ingin mengonfirmasi kehadiran.

Nama: ${guestName}
Kehadiran: ${attendance.value}`;


    /*
       Jumlah tamu hanya ditampilkan
       jika tamu memilih HADIR.
    */

    if (attendance.value === "Hadir") {

        message +=
`\nJumlah tamu: ${guestCount} orang`;

    }


    message +=
`

Ucapan:
${guestMessage || "-"}

Terima kasih.`;


    /* =========================
       BUAT LINK WHATSAPP
    ========================= */

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    /* =========================
       BUKA WHATSAPP
    ========================= */

    window.open(
        whatsappURL,
        "_blank"
    );

});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================
   ACTIVE NAVBAR
========================= */

const navLinks =
    document.querySelectorAll(".nav-menu a");


const sections =
    document.querySelectorAll(
        "#couple, #story, #event, #gallery, #gift, #rsvp"
    );


function updateActiveMenu() {

    let currentSection = "";


    const trigger =
        window.innerHeight * 0.35;


    sections.forEach(function (section) {

        const rect =
            section.getBoundingClientRect();


        if (
            rect.top <= trigger &&
            rect.bottom > trigger
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(function (link) {

        const target =
            link.getAttribute("href");


        if (
            currentSection &&
            target === "#" + currentSection
        ) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveMenu
);


window.addEventListener(
    "resize",
    updateActiveMenu
);


updateActiveMenu();

/* =========================
   SCROLL ANIMATION
========================= */

const animationElements =
    document.querySelectorAll(
        ".section h2, " +
        ".section-label, " +
        ".section-description, " +
        ".person, " +
        ".story-item, " +
        ".event-card, " +
        ".countdown-box, " +
        ".gallery-item, " +
        "#rsvpForm"
    );


animationElements.forEach(function (element) {

    element.classList.add("animate");

});


/* Foto pasangan */

const people =
    document.querySelectorAll(".person");


if (people.length >= 2) {

    people[0].classList.remove("animate");
    people[0].classList.add("animate-left");


    people[1].classList.remove("animate");
    people[1].classList.add("animate-right");

}


/* =========================
   INTERSECTION OBSERVER
========================= */

const animationObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document
    .querySelectorAll(
        ".animate, .animate-left, .animate-right"
    )
    .forEach(function (element) {

        animationObserver.observe(element);

    })/* =========================
   PERSONALIZED GUEST
========================= */

const guestNameDisplay =
    document.getElementById("guestNameDisplay");

const guestNameInput =
    document.getElementById("guestName");


const urlParams =
    new URLSearchParams(window.location.search);


const guestName =
    urlParams.get("to");


if (guestName && guestName.trim() !== "") {

    const cleanGuestName =
        guestName.trim();


    /* Nama di opening */

    guestNameDisplay.textContent =
        cleanGuestName;


    /* Nama di form RSVP */

    guestNameInput.value =
        cleanGuestName;

}/* =========================
   COPY BANK ACCOUNT
========================= */

const copyAccount =
    document.getElementById("copyAccount");


const accountNumber =
    document.getElementById("accountNumber");


copyAccount.addEventListener("click", function () {

    const number =
        accountNumber.textContent.trim();


    navigator.clipboard
        .writeText(number)
        .then(function () {

            copyAccount.textContent =
                "✓ TERSALIN";


            setTimeout(function () {

                copyAccount.textContent =
                    "SALIN NOMOR REKENING";

            }, 2000);

        })
        .catch(function () {

            alert(
                "Nomor rekening: " + number
            );

        });

});/* =========================
   BACK TO TOP
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        console.log("Tombol Back to Top tidak ditemukan.");
        return;
    }

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    });

});