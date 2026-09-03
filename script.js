
/* =========================================================
   YOGMALTI
   PREMIUM YOGA & WELLNESS WEBSITE
   script.js
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initHeaderScroll();

    initSmoothNavigation();

    initActiveNavigation();

    initTestimonialSlider();

    initJoinForm();

    initCurrentYear();

    initScrollReveal();

});


/* =========================================================
   02. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector("#mobileMenu");

    if (!menuToggle || !mobileMenu) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

    });


    /*
        Close mobile menu after clicking
        any navigation link
    */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });


    /*
        Close menu using Escape key
    */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.focus();

            }

        }
    );

}


/* =========================================================
   03. HEADER SCROLL EFFECT
========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(".site-header");

    if (!header) {
        return;
    }


    const handleScroll = () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    handleScroll();


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );

}


/* =========================================================
   04. SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(href);


                if (!target) {

                    return;

                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                /*
                    Update URL hash without
                    jumping instantly
                */

                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        "",
                        href
                    );

                }

            }
        );

    });

}


/* =========================================================
   05. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY + 150;


        let currentSection = "";


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


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    };


    updateActiveLink();


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );

}


/* =========================================================
   06. TESTIMONIAL SLIDER
========================================================= */

function initTestimonialSlider() {

    const slider =
        document.querySelector(
            "#testimonialSlider"
        );


    const prevButton =
        document.querySelector(
            ".testimonial-prev"
        );


    const nextButton =
        document.querySelector(
            ".testimonial-next"
        );


    if (
        !slider ||
        !prevButton ||
        !nextButton
    ) {

        return;

    }


    const cards =
        Array.from(
            slider.children
        );


    if (!cards.length) {

        return;

    }


    let currentIndex = 0;


    /*
        Desktop:
        show cards normally.

        Mobile:
        show one card at a time.
    */

    function getVisibleCards() {

        if (
            window.innerWidth <= 600
        ) {

            return 1;

        }


        if (
            window.innerWidth <= 900
        ) {

            return 2;

        }


        return 3;

    }


    function updateSlider() {

        const visibleCards =
            getVisibleCards();


        const maxIndex =
            Math.max(
                0,
                cards.length -
                visibleCards
            );


        if (
            currentIndex >
            maxIndex
        ) {

            currentIndex =
                maxIndex;

        }


        /*
            Only use slider movement
            on smaller screens.
        */

        if (
            window.innerWidth <= 900
        ) {

            const cardWidth =
                cards[0].offsetWidth;


            const gap =
                parseFloat(
                    getComputedStyle(
                        slider
                    ).gap
                ) || 0;


            const moveAmount =
                currentIndex *
                (cardWidth + gap);


            slider.style.transform =
                `translateX(-${moveAmount}px)`;


            slider.style.transition =
                "transform 0.45s ease";


        } else {

            slider.style.transform =
                "translateX(0)";

        }


        /*
            Button state
        */

        prevButton.disabled =
            currentIndex === 0;


        nextButton.disabled =
            currentIndex >= maxIndex;


        prevButton.style.opacity =
            currentIndex === 0
                ? "0.45"
                : "1";


        nextButton.style.opacity =
            currentIndex >= maxIndex
                ? "0.45"
                : "1";

    }


    prevButton.addEventListener(
        "click",
        () => {

            if (
                currentIndex > 0
            ) {

                currentIndex--;

                updateSlider();

            }

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            const visibleCards =
                getVisibleCards();


            const maxIndex =
                Math.max(
                    0,
                    cards.length -
                    visibleCards
                );


            if (
                currentIndex <
                maxIndex
            ) {

                currentIndex++;

                updateSlider();

            }

        }
    );


    /*
        Touch / Swipe
    */

    let touchStartX = 0;

    let touchEndX = 0;


    slider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            handleSwipe();

        },
        {
            passive: true
        }
    );


    function handleSwipe() {

        const difference =
            touchStartX -
            touchEndX;


        if (
            Math.abs(difference) < 50
        ) {

            return;

        }


        if (
            difference > 0
        ) {

            nextButton.click();

        } else {

            prevButton.click();

        }

    }


    /*
        Reset slider when
        viewport changes
    */

    window.addEventListener(
        "resize",
        updateSlider
    );


    updateSlider();

}


/* =========================================================
   07. JOIN FORM
========================================================= */

function initJoinForm() {

    const form =
        document.querySelector(
            "#joinForm"
        );


    const message =
        document.querySelector(
            "#formMessage"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /*
                Get values
            */

            const name =
                document.querySelector(
                    "#fullName"
                )?.value.trim();


            const email =
                document.querySelector(
                    "#email"
                )?.value.trim();


            const phone =
                document.querySelector(
                    "#phone"
                )?.value.trim();


            const interest =
                document.querySelector(
                    "#interest"
                )?.value;


            /*
                Clear previous message
            */

            if (message) {

                message.textContent = "";

            }


            /*
                Basic validation
            */

            if (!name) {

                showFormError(
                    message,
                    "Please enter your full name."
                );

                return;

            }


            if (!isValidEmail(email)) {

                showFormError(
                    message,
                    "Please enter a valid email address."
                );

                return;

            }


            if (!phone) {

                showFormError(
                    message,
                    "Please enter your phone number."
                );

                return;

            }


            if (!interest) {

                showFormError(
                    message,
                    "Please select a program."
                );

                return;

            }


            /*
                Success
            */

            if (message) {

                message.style.color =
                    "#728c63";

                message.textContent =
                    `Thank you, ${name}! Your interest has been received. We will contact you soon.`;

            }


            /*
                Store locally for now.

                IMPORTANT:
                This is only front-end storage.
                Connect this form to PHP/backend
                later for real submissions.
            */

            try {

                const submissions =
                    JSON.parse(
                        localStorage.getItem(
                            "yogmaltiLeads"
                        )
                    ) || [];


                submissions.push({

                    name: name,

                    email: email,

                    phone: phone,

                    interest: interest,

                    date:
                        new Date().toISOString()

                });


                localStorage.setItem(
                    "yogmaltiLeads",
                    JSON.stringify(
                        submissions
                    )
                );

            } catch (error) {

                console.warn(
                    "Local storage unavailable.",
                    error
                );

            }


            /*
                Reset form
            */

            form.reset();

        }
    );

}


/* =========================================================
   08. EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    if (!email) {

        return false;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );

}


/* =========================================================
   09. FORM ERROR
========================================================= */

function showFormError(
    messageElement,
    text
) {

    if (!messageElement) {

        return;

    }


    messageElement.style.color =
        "#b34d4d";


    messageElement.textContent =
        text;

}


/* =========================================================
   10. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const yearElement =
        document.querySelector(
            "#currentYear"
        );


    if (!yearElement) {

        return;

    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   11. SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    /*
        Respect reduced-motion settings.
    */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        return;

    }


    const elements =
        document.querySelectorAll(
            ".program-card, " +
            ".expert-card, " +
            ".benefit-card, " +
            ".testimonial-card, " +
            ".stat-item, " +
            ".contact-box"
        );


    if (!elements.length) {

        return;

    }


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, " +
            "transform 0.7s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   12. CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900
        ) {

            const mobileMenu =
                document.querySelector(
                    "#mobileMenu"
                );


            const menuToggle =
                document.querySelector(
                    ".menu-toggle"
                );


            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "active"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }

    }
);


/* =========================================================
   13. PREVENT EMPTY HASH JUMP
========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href="#"]'
            );


        if (!link) {

            return;

        }


        event.preventDefault();

    }
);


/* =========================================================
   END
========================================================= */
