document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =====================================================
     YOGMALTI WHATSAPP NUMBER
     Replace with client's WhatsApp number.
     Example: 919876543210
  ===================================================== */

  const WHATSAPP_NUMBER = "91XXXXXXXXXX";


  /* =====================================================
     NAVBAR
     Navbar automatically becomes compact while scrolling.
  ===================================================== */

  const header = document.querySelector(".site-header");

  const updateNavbar = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      header.classList.add("is-compact");
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("is-compact");
    }
  };

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  const navLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      try {
        history.replaceState(
          null,
          "",
          targetId
        );
      } catch (error) {
        // Ignore browser history errors
      }

    });

  });


  /* =====================================================
     ACTIVE NAVBAR LINK
  ===================================================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {

              const href =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                href ===
                  "#" + entry.target.id
              );

            });

          });

        },
        {
          rootMargin:
            "-25% 0px -65% 0px",
          threshold: 0
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* =====================================================
     TESTIMONIAL SLIDER
  ===================================================== */

  const testimonialSlider =
    document.getElementById(
      "testimonialSlider"
    );

  const previousButton =
    document.querySelector(
      ".testimonial-prev"
    );

  const nextButton =
    document.querySelector(
      ".testimonial-next"
    );

  if (testimonialSlider) {

    const cards = Array.from(
      testimonialSlider.children
    );

    let currentIndex = 0;
    let sliderTimer = null;


    const getVisibleCards = () => {

      if (window.innerWidth <= 700) {
        return 1;
      }

      if (window.innerWidth <= 1050) {
        return 2;
      }

      return 3;

    };


    const moveSlider = (index) => {

      if (!cards.length) return;

      const visibleCards =
        getVisibleCards();

      const maxIndex = Math.max(
        0,
        cards.length - visibleCards
      );

      currentIndex = Math.max(
        0,
        Math.min(index, maxIndex)
      );

      const targetCard =
        cards[currentIndex];

      if (!targetCard) return;

      testimonialSlider.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth"
      });

    };


    const startSlider = () => {

      clearInterval(sliderTimer);

      if (
        cards.length <=
        getVisibleCards()
      ) {
        return;
      }

      sliderTimer = setInterval(() => {

        const maxIndex = Math.max(
          0,
          cards.length -
            getVisibleCards()
        );

        if (
          currentIndex >= maxIndex
        ) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }

        moveSlider(currentIndex);

      }, 5000);

    };


    const restartSlider = () => {
      startSlider();
    };


    if (nextButton) {

      nextButton.addEventListener(
        "click",
        () => {

          moveSlider(
            currentIndex + 1
          );

          restartSlider();

        }
      );

    }


    if (previousButton) {

      previousButton.addEventListener(
        "click",
        () => {

          moveSlider(
            currentIndex - 1
          );

          restartSlider();

        }
      );

    }


    testimonialSlider.addEventListener(
      "mouseenter",
      () => {
        clearInterval(sliderTimer);
      }
    );


    testimonialSlider.addEventListener(
      "mouseleave",
      () => {
        startSlider();
      }
    );


    testimonialSlider.addEventListener(
      "touchstart",
      () => {
        clearInterval(sliderTimer);
      },
      { passive: true }
    );


    testimonialSlider.addEventListener(
      "touchend",
      () => {
        startSlider();
      },
      { passive: true }
    );


    window.addEventListener(
      "resize",
      () => {

        currentIndex = 0;

        moveSlider(0);

        startSlider();

      }
    );


    startSlider();

  }


  /* =====================================================
     IMAGE GALLERY
     Automatic slow marquee.
  ===================================================== */

  const galleryTrack =
    document.querySelector(
      ".gallery-track"
    );

  if (galleryTrack) {

    let galleryAnimation;

    const startGallery = () => {

      galleryTrack.style.animationPlayState =
        "running";

    };


    const stopGallery = () => {

      galleryTrack.style.animationPlayState =
        "paused";

    };


    galleryTrack.addEventListener(
      "mouseenter",
      stopGallery
    );

    galleryTrack.addEventListener(
      "mouseleave",
      startGallery
    );

    galleryTrack.addEventListener(
      "touchstart",
      stopGallery,
      { passive: true }
    );

    galleryTrack.addEventListener(
      "touchend",
      startGallery,
      { passive: true }
    );

  }


  /* =====================================================
     WHATSAPP FORM
  ===================================================== */

  const form =
    document.getElementById(
      "joinForm"
    );

  const formMessage =
    document.getElementById(
      "formMessage"
    );


  const showFormMessage = (
    message,
    type = "success"
  ) => {

    if (!formMessage) return;

    formMessage.textContent = message;

    formMessage.className =
      "form-message " + type;

  };


  const validEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  };


  if (form) {

    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const nameInput =
          document.getElementById(
            "fullName"
          );

        const emailInput =
          document.getElementById(
            "email"
          );

        const phoneInput =
          document.getElementById(
            "phone"
          );

        const interestInput =
          document.getElementById(
            "interest"
          );


        const name =
          nameInput?.value.trim() || "";

        const email =
          emailInput?.value.trim() || "";

        const phone =
          phoneInput?.value.trim() || "";

        const interest =
          interestInput?.value || "";


        /* Validation */

        if (
          !name ||
          !email ||
          !phone ||
          !interest
        ) {

          showFormMessage(
            "Please fill all required fields.",
            "error"
          );

          return;

        }


        if (!validEmail(email)) {

          showFormMessage(
            "Please enter a valid email address.",
            "error"
          );

          emailInput?.focus();

          return;

        }


        if (
          WHATSAPP_NUMBER.includes("X")
        ) {

          showFormMessage(
            "Please add the client's WhatsApp number in script.js.",
            "error"
          );

          return;

        }


        /* Get selected program name */

        let interestName =
          interest;

        if (
          interestInput &&
          interestInput.selectedOptions &&
          interestInput.selectedOptions[0]
        ) {

          interestName =
            interestInput
              .selectedOptions[0]
              .textContent
              .trim();

        }


        /* Clean phone */

        const cleanPhone =
          phone.replace(
            /[^\d+\-\s()]/g,
            ""
          );


        /* =================================================
           WHATSAPP MESSAGE
        ================================================= */

        const message =
`Hello YogMalti,

I want to join YogMalti Community.

Name: ${name}
Phone: ${cleanPhone}
Email: ${email}
Interested in: ${interestName}

Please share the next steps.`;


        const whatsappNumber =
          WHATSAPP_NUMBER.replace(
            /\D/g,
            ""
          );


        const whatsappURL =
          "https://wa.me/" +
          whatsappNumber +
          "?text=" +
          encodeURIComponent(message);


        showFormMessage(
          "Opening WhatsApp...",
          "success"
        );


        /* Open WhatsApp */

        setTimeout(() => {

          window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
          );

        }, 200);

      }
    );

  }


  /* =====================================================
     FAQ ACCORDION
  ===================================================== */

  const faqItems =
    document.querySelectorAll(
      ".faq-list details"
    );

  faqItems.forEach((item) => {

    item.addEventListener(
      "toggle",
      () => {

        if (!item.open) return;

        faqItems.forEach((otherItem) => {

          if (
            otherItem !== item
          ) {

            otherItem.removeAttribute(
              "open"
            );

          }

        });

      }
    );

  });


  /* =====================================================
     GALLERY IMAGE FALLBACK
  ===================================================== */

  const galleryImages =
    document.querySelectorAll(
      ".gallery-item img"
    );

  galleryImages.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );

      }
    );

  });


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      [
        ".program-card",
        ".expert-card",
        ".benefit-card",
        ".testimonial-card",
        ".gallery-item",
        ".stat-item"
      ].join(",")
    );


  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.08
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(
        element
      );

    });

  }


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  const currentYear =
    document.getElementById(
      "currentYear"
    );

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        document.activeElement?.blur();

      }

    }
  );

});