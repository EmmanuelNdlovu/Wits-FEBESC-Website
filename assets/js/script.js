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
/*
// =========================================
// Document Lightbox for PDFs
// =========================================

    const modal = document.getElementById('pdf-modal');
    const openBtn = document.getElementById('open-pdf-btn');
    const closeBtn = document.getElementById('close-pdf-btn');

    // Open the modal when clicking the text/button
    openBtn.addEventListener('click', () => {
        modal.showModal(); // showModal() is built into HTML5 browsers
    });

    // Close the modal when clicking the X button
    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    // Optional: Close the modal if they click outside the box
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
*/

// =========================================
// Document Lightbox for PDFs
// =========================================

const pdfModal = document.getElementById('pdf-modal');
const openPdfBtn = document.getElementById('open-pdf-btn'); // Matches your link's ID
const closePdfBtn = document.getElementById('close-pdf-btn');

// Only run the listeners if the elements actually exist on the current page
if (pdfModal && openPdfBtn && closePdfBtn) {

    // Open the modal when clicking the button
    openPdfBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents the '#' link from jumping the page
        pdfModal.showModal(); 
    });

    // Close the modal when clicking the X button
    closePdfBtn.addEventListener('click', () => {
        pdfModal.close();
    });

    // Close the modal if they click outside the box
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            pdfModal.close();
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

// =========================================
// BURSARY SEARCH
// =========================================

const searchInput = document.getElementById("bursarySearch");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".bursary-card");

        cards.forEach(card=>{

            const text = card.textContent.toLowerCase();

            if(text.includes(value)){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

}

/// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if(menuToggle){

    menuToggle.addEventListener("click", ()=>{

        nav.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if(nav.classList.contains("active")){

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        }else{

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});