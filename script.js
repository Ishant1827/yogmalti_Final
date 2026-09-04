document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");

    if (menuToggle && navbarMenu) {

        menuToggle.addEventListener("click", () => {
            navbarMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen =
                navbarMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        document.querySelectorAll(".navbar-menu a").forEach(link => {

            link.addEventListener("click", () => {

                navbarMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* =========================================================
       TESTIMONIAL CAROUSEL
    ========================================================= */

    const testimonialTrack =
        document.querySelector(".testimonials-track");

    const testimonialCards =
        document.querySelectorAll(".testimonial-card");

    const testimonialPrev =
        document.querySelector(".testimonial-prev");

    const testimonialNext =
        document.querySelector(".testimonial-next");

    let testimonialIndex = 0;


    function getCardsPerView() {

        if (window.innerWidth <= 760) {
            return 1;
        }

        if (window.innerWidth <= 1100) {
            return 2;
        }

        return 3;
    }


    function updateTestimonials() {

        if (
            !testimonialTrack ||
            testimonialCards.length === 0
        ) {
            return;
        }

        const cardsPerView =
            getCardsPerView();

        const maxIndex =
            Math.max(
                0,
                testimonialCards.length - cardsPerView
            );

        testimonialIndex =
            Math.min(
                testimonialIndex,
                maxIndex
            );

        const cardWidth =
            testimonialCards[0]
                .getBoundingClientRect()
                .width;

        const gap = 24;

        const moveAmount =
            testimonialIndex *
            (cardWidth + gap);

        testimonialTrack.style.transform =
            `translateX(-${moveAmount}px)`;
    }


    if (testimonialNext) {

        testimonialNext.addEventListener(
            "click",
            () => {

                const cardsPerView =
                    getCardsPerView();

                const maxIndex =
                    Math.max(
                        0,
                        testimonialCards.length -
                        cardsPerView
                    );

                if (
                    testimonialIndex <
                    maxIndex
                ) {

                    testimonialIndex++;

                } else {

                    testimonialIndex = 0;
                }

                updateTestimonials();
            }
        );
    }


    if (testimonialPrev) {

        testimonialPrev.addEventListener(
            "click",
            () => {

                const cardsPerView =
                    getCardsPerView();

                const maxIndex =
                    Math.max(
                        0,
                        testimonialCards.length -
                        cardsPerView
                    );

                if (testimonialIndex > 0) {

                    testimonialIndex--;

                } else {

                    testimonialIndex = maxIndex;
                }

                updateTestimonials();
            }
        );
    }


    window.addEventListener(
        "resize",
        updateTestimonials
    );

    updateTestimonials();


    /* =========================================================
       FAQ ACCORDION
    ========================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) {
            return;
        }


        question.setAttribute(
            "role",
            "button"
        );

        question.setAttribute(
            "tabindex",
            "0"
        );


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );
                    }
                );


                if (!isActive) {

                    item.classList.add(
                        "active"
                    );
                }
            }
        );


        /* Keyboard accessibility */

        question.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    question.click();
                }
            }
        );

    });


    /* =========================================================
       SMOOTH SCROLL
    ========================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


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
       JOIN NOW / REGISTER BUTTON
    ========================================================= */

    const joinButtons =
        document.querySelectorAll(
            ".join-btn, " +
            ".join-now-btn, " +
            ".register-btn, " +
            ".sticky-register"
        );


    joinButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const contactSection =
                    document.querySelector(
                        "#contact"
                    );


                if (contactSection) {

                    /*
                     * Prevent default only for
                     * buttons/links that have
                     * no useful destination.
                     */

                    if (
                        button.tagName === "BUTTON" ||
                        button.getAttribute("href") === "#"
                    ) {
                        event.preventDefault();
                    }


                    contactSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }
        );

    });


 /* =========================================================
   CONTACT / JOIN FORM
   SEND DETAILS TO WHATSAPP
========================================================= */

const joinForm =
    document.querySelector("#joinForm");

if (joinForm) {

    joinForm.addEventListener("submit", event => {

        event.preventDefault();


        /* -------------------------
           GET FORM VALUES
        ------------------------- */

        const fullName =
            document.querySelector("#fullName")?.value.trim() || "";

        const email =
            document.querySelector("#email")?.value.trim() || "";

        const phone =
            document.querySelector("#phone")?.value.trim() || "";

        const interest =
            document.querySelector("#interest")?.value || "";


        /* -------------------------
           VALIDATION
        ------------------------- */

        if (!fullName) {
            alert("Please enter your full name.");
            return;
        }

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number.");
            return;
        }

        if (!interest) {
            alert("Please select your interest.");
            return;
        }


        /* -------------------------
           WHATSAPP NUMBER
        ------------------------- */

        const whatsappNumber =
            "919004012757";


        /* -------------------------
           WHATSAPP MESSAGE
        ------------------------- */

        const whatsappMessage =
`Namaste YogMalti!

I want to join the YogMalti community.

Full Name: ${fullName}
Email: ${email}
Phone Number: ${phone}
I'm interested in: ${interest}

Please contact me with more details.

Thank you!
YogMalti`;


        /* -------------------------
           ENCODE MESSAGE
        ------------------------- */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        /* -------------------------
           WHATSAPP URL
        ------------------------- */

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        /* -------------------------
           OPEN WHATSAPP
        ------------------------- */

        window.open(
            whatsappURL,
            "_blank"
        );


        /* -------------------------
           SUCCESS MESSAGE
        ------------------------- */

        const formMessage =
            document.querySelector("#formMessage");

        if (formMessage) {

            formMessage.textContent =
                "Thank you! Opening WhatsApp...";

            formMessage.classList.add("success");
        }


        /* -------------------------
           RESET FORM
        ------------------------- */

        joinForm.reset();

    });

}

    /* =========================================================
       TRAINER CREDENTIALS MODAL
    ========================================================= */

    const credentialsModal =
        document.querySelector(
            "#credentialsModal"
        );


    const credentialsImage =
        document.querySelector(
            "#credentialsImage"
        );


    const credentialsTitle =
        document.querySelector(
            "#credentialsTitle"
        );


    const credentialsClose =
        document.querySelector(
            "#credentialsClose"
        );


    /*
     * Supports both class names:
     * .credentials-trigger
     * .credentials-btn
     */

    const credentialButtons =
        document.querySelectorAll(
            ".credentials-trigger, .credentials-btn"
        );


    /* -------------------------
       OPEN MODAL
    ------------------------- */

    function openCredentialsModal(
        imagePath,
        trainerName
    ) {

        if (
            !credentialsModal ||
            !credentialsImage ||
            !imagePath
        ) {
            return;
        }


        credentialsImage.src =
            imagePath;


        credentialsImage.alt =
            `${trainerName} credentials`;


        if (credentialsTitle) {

            credentialsTitle.textContent =
                `${trainerName} - Credentials`;
        }


        credentialsModal.classList.add(
            "active"
        );


        credentialsModal.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
         * Prevent background page
         * from scrolling while modal
         * is open.
         */

        document.body.classList.add(
            "credentials-modal-open"
        );

    }


    /* -------------------------
       CLOSE MODAL
    ------------------------- */

    function closeCredentialsModal() {

        if (!credentialsModal) {
            return;
        }


        credentialsModal.classList.remove(
            "active"
        );


        credentialsModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "credentials-modal-open"
        );


        /*
         * Clear image after closing.
         */

        if (credentialsImage) {

            credentialsImage.src = "";
        }

    }


    /* -------------------------
       CREDENTIAL BUTTON CLICK
    ------------------------- */

    credentialButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const imagePath =
                        button.getAttribute(
                            "data-credential-image"
                        );


                    const trainerName =
                        button.getAttribute(
                            "data-credential-name"
                        ) ||
                        "Trainer";


                    if (imagePath) {

                        openCredentialsModal(
                            imagePath,
                            trainerName
                        );
                    }

                }
            );

        }
    );


    /* -------------------------
       CLOSE BUTTON
    ------------------------- */

    if (credentialsClose) {

        credentialsClose.addEventListener(
            "click",
            closeCredentialsModal
        );
    }


    /* -------------------------
       CLICK OUTSIDE DIALOG
    ------------------------- */

    if (credentialsModal) {

        credentialsModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    credentialsModal
                ) {

                    closeCredentialsModal();
                }

            }
        );
    }


    /* -------------------------
       ESCAPE KEY
    ------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                credentialsModal &&
                credentialsModal.classList.contains(
                    "active"
                )
            ) {

                closeCredentialsModal();
            }

        }
    );


    /* =========================================================
       CURRENT YEAR
    ========================================================= */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date().getFullYear();

        }
    );


    /* =========================================================
       GALLERY PAUSE ON HOVER
    ========================================================= */

    const galleryTrack =
        document.querySelector(
            ".gallery-track"
        );


    if (galleryTrack) {

        galleryTrack.addEventListener(
            "mouseenter",
            () => {

                galleryTrack.style
                    .animationPlayState =
                    "paused";
            }
        );


        galleryTrack.addEventListener(
            "mouseleave",
            () => {

                galleryTrack.style
                    .animationPlayState =
                    "running";
            }
        );
    }


    /* =========================================================
       FLOATING IMAGE STACK
       TOP IMAGE + KRISHNA
    ========================================================= */

    const floatingImages =
        document.querySelectorAll(
            ".sticky-floating-image"
        );


    floatingImages.forEach(
        floatingImage => {

            floatingImage.addEventListener(
                "click",
                event => {

                    const href =
                        floatingImage.getAttribute(
                            "href"
                        );


                    /*
                     * If href is "#" or empty,
                     * don't jump to page top.
                     */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        event.preventDefault();
                    }

                }
            );

        }
    );


    /* =========================================================
       PREVENT IMAGE DRAGGING
    ========================================================= */

    document
        .querySelectorAll(
            ".sticky-floating-image img, " +
            ".credentials-image"
        )
        .forEach(image => {

            image.setAttribute(
                "draggable",
                "false"
            );

        });


    /* =========================================================
       IMAGE ERROR HANDLING
    ========================================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image could not be loaded:",
                        image.src
                    );

                }
            );

        });


    /* =========================================================
       PAGE LOAD COMPLETE
    ========================================================= */

    document.documentElement.classList.add(
        "js-loaded"
    );

});

/* =========================================================
   JANMASHTAMI ONE-TIME ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("janmashtami-popup");
    const petals = document.getElementById("petals");

    if (!popup || !petals) {
        console.error("Janmashtami popup elements missing!");
        return;
    }

    setTimeout(() => {

        /* Show Krishna + text */
        popup.classList.add("show");

        /* Create flowers */
        for (let i = 0; i < 180; i++) {

            const flower = document.createElement("span");

            flower.className = "petal";

            flower.style.left = Math.random() * 100 + "%";

            flower.style.animationDuration =
                (3 + Math.random() * 3) + "s";

            flower.style.animationDelay =
                (Math.random() * 1.5) + "s";

            flower.style.opacity =
                0.8 + Math.random() * 0.2;

            petals.appendChild(flower);
        }

    }, 1000);


    /* Remove complete animation */
    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {
            popup.remove();
        }, 1000);

    }, 9000);

});