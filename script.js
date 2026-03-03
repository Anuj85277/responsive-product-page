/* ================= STICKY HEADER (Optimized) ================= */

const stickyHeader = document.getElementById("stickyHeader");
const heroSection = document.getElementById("hero");

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const trigger = heroSection.offsetHeight - 120;
      stickyHeader.classList.toggle(
        "active",
        window.scrollY > trigger
      );
      ticking = false;
    });
    ticking = true;
  }
});


/* ================= IMAGE SWITCH + FADE ================= */

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");

mainImage.style.transition = "opacity 0.3s ease";

thumbnails.forEach(thumb => {
  thumb.addEventListener("click", () => {
    thumbnails.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");

    const newSrc = thumb.src.replace("200/150", "800/600");

    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = newSrc;
      mainImage.style.opacity = 1;
    }, 200);
  });
});


/* ================= ZOOM ================= */

const zoomPreview = document.getElementById("zoomPreview");
const imageContainer = document.querySelector(".main-image-container");

imageContainer.addEventListener("mousemove", e => {
  if (window.innerWidth < 1024) return;

  const rect = mainImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  zoomPreview.style.display = "block";
  zoomPreview.style.backgroundImage = `url(${mainImage.src})`;
  zoomPreview.style.backgroundSize = "250%";
  zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});

imageContainer.addEventListener("mouseleave", () => {
  zoomPreview.style.display = "none";
});


/* ================= FAQ ================= */

document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const expanded = q.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.setAttribute("aria-expanded", "false");
      btn.nextElementSibling.style.maxHeight = null;
    });

    if (!expanded) {
      q.setAttribute("aria-expanded", "true");
      q.nextElementSibling.style.maxHeight =
        q.nextElementSibling.scrollHeight + "px";
    }
  });
});


/* ================= SLIDER ================= */

const track = document.querySelector(".app-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let scrollAmount = 0;
const step = 300;

function updateArrows() {
  prevBtn.disabled = scrollAmount <= 0;
  nextBtn.disabled =
    scrollAmount + track.clientWidth >= track.scrollWidth;
}

nextBtn.addEventListener("click", () => {
  scrollAmount += step;
  track.scrollTo({ left: scrollAmount, behavior: "smooth" });
  updateArrows();
});

prevBtn.addEventListener("click", () => {
  scrollAmount -= step;
  if (scrollAmount < 0) scrollAmount = 0;
  track.scrollTo({ left: scrollAmount, behavior: "smooth" });
  updateArrows();
});

updateArrows();


/* ================= MOBILE SWIPE ================= */

let startX = 0;
let isDown = false;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isDown = true;
});

track.addEventListener("touchmove", e => {
  if (!isDown) return;

  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;

  track.scrollLeft += diff;
  startX = currentX;
});

track.addEventListener("touchend", () => {
  isDown = false;
});


/* ================= MODAL ================= */

const modal = document.getElementById("datasheetModal");
const downloadBtn = document.querySelector(".download-btn");
const closeModal = document.querySelector(".modal-close");

downloadBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("active");
});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => observer.observe(el));