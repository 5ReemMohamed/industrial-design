
document.addEventListener("DOMContentLoaded", function () {
    /* Mobile Navigation */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        const navLinks = mainNav.querySelectorAll("a");
        const toggleIcon = menuToggle.querySelector("i");

        function closeMenu() {
            mainNav.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "فتح القائمة");

            if (toggleIcon) {
                toggleIcon.classList.remove("fa-xmark");
                toggleIcon.classList.add("fa-bars");
            }
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("show");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "إغلاق القائمة" : "فتح القائمة"
            );

            if (toggleIcon) {
                toggleIcon.classList.toggle("fa-bars", !isOpen);
                toggleIcon.classList.toggle("fa-xmark", isOpen);
            }
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();

                navLinks.forEach(function (item) {
                    item.classList.remove("active");
                });

                link.classList.add("active");
            });
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 991) {
                closeMenu();
            }
        });
    }

    /* About Section Tabs */

    const aboutSections = document.querySelectorAll(".ds-about-section");

    aboutSections.forEach(function (section) {
        const tabButtons = section.querySelectorAll(".ds-tab-button");
        const tabContents = section.querySelectorAll(".ds-tab-content");

        tabButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const targetId = button.dataset.tab;
                const targetContent = section.querySelector(
                    "#" + CSS.escape(targetId)
                );

                if (!targetContent) {
                    return;
                }

                tabButtons.forEach(function (tab) {
                    tab.classList.remove("active");
                    tab.setAttribute("aria-selected", "false");
                });

                tabContents.forEach(function (content) {
                    content.classList.remove("active");
                });

                button.classList.add("active");
                button.setAttribute("aria-selected", "true");
                targetContent.classList.add("active");
            });

            button.setAttribute(
                "aria-selected",
                button.classList.contains("active") ? "true" : "false"
            );
        });
    });

    /* Close Mobile Navigation When Clicking Outside */

    document.addEventListener("click", function (event) {
        if (!mainNav || !menuToggle) {
            return;
        }

        const clickedInsideNav = mainNav.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideNav && !clickedToggle) {
            mainNav.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });
  const galleryElement = document.querySelector(".ds-gallery-swiper");
    const lightbox = document.getElementById("dsGalleryLightbox");

    if (!galleryElement || typeof Swiper === "undefined") return;

    const gallerySwiper = new Swiper(galleryElement, {
        loop: true,
        speed: 750,
        spaceBetween: 22,
        slidesPerView: 1,
        grabCursor: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: ".ds-gallery-next",
            prevEl: ".ds-gallery-prev"
        },
        pagination: {
            el: ".ds-gallery-pagination",
            clickable: true
        },
        breakpoints: {
            576: {
                slidesPerView: 1.5,
                spaceBetween: 18
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 22
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        }
    });

    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector(".ds-lightbox-image");
    const closeButton = lightbox.querySelector(".ds-lightbox-close");
    const prevButton = lightbox.querySelector(".ds-lightbox-prev");
    const nextButton = lightbox.querySelector(".ds-lightbox-next");

    let currentImages = [];
    let currentIndex = 0;

    function collectImages() {
        return Array.from(
            galleryElement.querySelectorAll(".swiper-slide img")
        ).filter(function (img) {
            return !img.closest(".swiper-slide-duplicate");
        });
    }

    function showLightboxImage(index) {
        if (!currentImages.length) return;

        currentIndex = (index + currentImages.length) % currentImages.length;

        const selectedImage = currentImages[currentIndex];
        lightboxImage.src = selectedImage.currentSrc || selectedImage.src;
        lightboxImage.alt = selectedImage.alt || "صورة من معرض الأعمال";
    }

    function openLightbox(image) {
        currentImages = collectImages();
        currentIndex = currentImages.findIndex(function (item) {
            return item === image;
        });

        if (currentIndex < 0) currentIndex = 0;

        showLightboxImage(currentIndex);
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("ds-lightbox-active");
        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("ds-lightbox-active");
        lightboxImage.src = "";
    }

    galleryElement.addEventListener("click", function (event) {
        const image = event.target.closest(".ds-gallery-card img");
        const zoomButton = event.target.closest(".ds-gallery-zoom");
        const slideImage = zoomButton
            ? zoomButton.closest(".ds-gallery-card").querySelector("img")
            : image;

        if (slideImage) openLightbox(slideImage);
    });

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", function () {
        showLightboxImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        showLightboxImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showLightboxImage(currentIndex - 1);
        if (event.key === "ArrowLeft") showLightboxImage(currentIndex + 1);
    });
     const contactForm = document.getElementById("dsContactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("dsContactName").value.trim();
        const phone = document.getElementById("dsContactPhone").value.trim();
        const service = document.getElementById("dsContactService").value;
        const message = document.getElementById("dsContactMessage").value.trim();
        const recipient = document.getElementById("dsContactRecipient").value;

        const whatsappMessage = [
            "السلام عليكم، أرغب في الاستفسار عن خدمات شركة السيف الدمشقي للتصميم الصناعي.",
            "",
            "الاسم: " + name,
            "رقم الهاتف: " + phone,
            "الخدمة المطلوبة: " + service,
            "تفاصيل المشروع: " + message
        ].join("\n");

        const whatsappUrl =
            "https://wa.me/" + recipient + "?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        contactForm.reset();
    });
       const yearElement = document.getElementById("dsFooterYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    document.querySelectorAll('.ds-footer a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* Animate On Scroll */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 80
        });
    }
});
