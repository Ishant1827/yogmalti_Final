document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener("click", () => {
            navbarMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        document.querySelectorAll(".navbar-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navbarMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =========================================
       TESTIMONIAL CAROUSEL
    ========================================= */

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

        if (!testimonialTrack || testimonialCards.length === 0) {
            return;
        }

        const cardsPerView = getCardsPerView();

        const maxIndex =
            Math.max(0, testimonialCards.length - cardsPerView);

        testimonialIndex =
            Math.min(testimonialIndex, maxIndex);

        const cardWidth =
            testimonialCards[0].getBoundingClientRect().width;

        const gap = 24;

        testimonialTrack.style.transform =
            `translateX(-${testimonialIndex * (cardWidth + gap)}px)`;
    }

    if (testimonialNext) {
        testimonialNext.addEventListener("click", () => {

            const cardsPerView = getCardsPerView();

            const maxIndex =
                Math.max(0, testimonialCards.length - cardsPerView);

            if (testimonialIndex < maxIndex) {
                testimonialIndex++;
            } else {
                testimonialIndex = 0;
            }

            updateTestimonials();
        });
    }

    if (testimonialPrev) {
        testimonialPrev.addEventListener("click", () => {

            const cardsPerView = getCardsPerView();

            const maxIndex =
                Math.max(0, testimonialCards.length - cardsPerView);

            if (testimonialIndex > 0) {
                testimonialIndex--;
            } else {
                testimonialIndex = maxIndex;
            }

            updateTestimonials();
        });
    }

    window.addEventListener("resize", updateTestimonials);

    updateTestimonials();


    /* =========================================
       FAQ ACCORDION
    ========================================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");

            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       JOIN NOW / REGISTER BUTTON
    ========================================= */

    const joinButtons = document.querySelectorAll(
        ".join-btn, .join-now-btn, .register-btn, .sticky-register"
    );

    joinButtons.forEach(button => {

        button.addEventListener("click", () => {

            const contactSection =
                document.querySelector("#contact");

            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       CONTACT / JOIN FORM
    ========================================= */

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.querySelector("#name")?.value.trim() || "";

            const phone =
                document.querySelector("#phone")?.value.trim() || "";

            const email =
                document.querySelector("#email")?.value.trim() || "";

            const message =
                document.querySelector("#message")?.value.trim() || "";

            if (!name || !phone) {
                alert("Please enter your name and phone number.");
                return;
            }

            const whatsappNumber = "919369907885";

            const whatsappMessage =
                `Namaste YogMalti!%0A%0A` +
                `I want to join YogMalti.%0A%0A` +
                `Name: ${encodeURIComponent(name)}%0A` +
                `Phone: ${encodeURIComponent(phone)}%0A` +
                `Email: ${encodeURIComponent(email)}%0A` +
                `Message: ${encodeURIComponent(message)}`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            window.open(whatsappURL, "_blank");

            contactForm.reset();
        });
    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================================
       GALLERY PAUSE ON HOVER
    ========================================= */

    const galleryTrack =
        document.querySelector(".gallery-track");

    if (galleryTrack) {

        galleryTrack.addEventListener("mouseenter", () => {
            galleryTrack.style.animationPlayState = "paused";
        });

        galleryTrack.addEventListener("mouseleave", () => {
            galleryTrack.style.animationPlayState = "running";
        });
    }


    /* =========================================
       ACTIVE FAQ ACCESSIBILITY
    ========================================= */

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) return;

        question.setAttribute("role", "button");
        question.setAttribute("tabindex", "0");

        question.addEventListener("keydown", e => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();
                question.click();

            }
        });
    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".program-card, .benefit-card, .stat-card, " +
        ".about-content, .expert-card, .testimonial-card, " +
        ".faq-item, .contact-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

});