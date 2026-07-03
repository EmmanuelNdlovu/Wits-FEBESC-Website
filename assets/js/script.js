// =========================================
// WITS FEBE STUDENTS' COUNCIL WEBSITE
// Main JavaScript
// =========================================


// =========================================
// HERO SLIDESHOW
// =========================================

const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showNextSlide() {

    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");

}

if (slides.length > 0) {

    // Ensure only the first slide is active
    slides.forEach(slide => slide.classList.remove("active"));
    slides[0].classList.add("active");

    // Change every 6 seconds
    setInterval(showNextSlide, 6000);

}



// =========================================
// TRANSPARENT HEADER
// =========================================

const header = document.querySelector("header");

function updateHeader() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

// Run immediately
updateHeader();

// Update while scrolling
window.addEventListener("scroll", updateHeader);

// =========================================
// EVENT VIDEO PREVIEW & MODAL
// =========================================

// Preview videos on hover
document.querySelectorAll(".poster-container").forEach(container => {

    const video = container.querySelector(".event-video");

    if (!video) return;

    container.addEventListener("mouseenter", () => {
        video.play();
    });

    container.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});

// Open video in modal
function openVideo(videoSrc) {

    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    if (!modal || !video) return;

    video.src = videoSrc;

    modal.style.display = "flex";

    video.play();

}

// Close modal
function closeVideo() {

    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    if (!modal || !video) return;

    video.pause();

    video.src = "";

    modal.style.display = "none";

}

// =========================================
// GALLERY LIGHTBOX
// =========================================

const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryClose = document.querySelector(".gallery-close");

document.querySelectorAll(".gallery-grid img").forEach(image => {

    image.addEventListener("click", () => {

        galleryImage.src = image.src;

        galleryModal.style.display = "flex";

    });

});

if (galleryClose) {

    galleryClose.addEventListener("click", () => {

        galleryModal.style.display = "none";

    });

}

if (galleryModal) {

    galleryModal.addEventListener("click", (e) => {

        if (e.target === galleryModal) {

            galleryModal.style.display = "none";

        }

    });

}

// =========================================
// ANIMATED STAT COUNTERS
// =========================================

const statNumbers = document.querySelectorAll(".stat-number");

const statsObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const stat = entry.target;
        const target = +stat.dataset.target;

        let count = 0;
        const increment = Math.max(1, Math.ceil(target / 100));

        const updateCounter = () => {

            count += increment;

            if (count >= target) {

                stat.textContent = target >= 100 ? target + "+" : target;
                return;

            }

            stat.textContent = count;

            requestAnimationFrame(updateCounter);

        };

        updateCounter();

        observer.unobserve(stat);

    });

});

statNumbers.forEach(stat => statsObserver.observe(stat));

// =========================================
// FADE IN ON SCROLL
// =========================================

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:0.15});

fadeElements.forEach(el=>fadeObserver.observe(el));