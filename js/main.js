// ====================== Dynamic Year ======================
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ====================== Navigation ======================
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav__list");
  const dropdownParents = document.querySelectorAll(".nav__item--dropdown");
  const submenuParents = document.querySelectorAll(".dropdown-menu__item--submenu");

  // Toggle main mobile menu
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
      navToggle.classList.toggle("active");
    });
  }

  // Products dropdown toggle (mobile only)
  dropdownParents.forEach(parent => {
    const link = parent.querySelector(".dropdown-toggle") || parent.querySelector("a");
    if (!link) return;
    link.addEventListener("click", function (e) {
      if (window.innerWidth > 992) return;
      e.preventDefault();
      dropdownParents.forEach(other => {
        if (other !== parent) other.classList.remove("open");
      });
      parent.classList.toggle("open");
    });
  });

  // Submenu toggling
  submenuParents.forEach(parent => {
    const link = parent.querySelector("a");
    if (!link) return;
    link.addEventListener("click", function (e) {
      if (window.innerWidth > 992) return;
      e.preventDefault();
      submenuParents.forEach(other => {
        if (other !== parent) other.classList.remove("open");
      });
      parent.classList.toggle("open");
    });
  });
});

// ====================== Header Hide on Scroll ======================
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (header) {
    if (scrollTop > lastScrollTop) {
      header.classList.add('hide-header'); // Scrolling down
    } else {
      header.classList.remove('hide-header'); // Scrolling up
    }
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ====================== Animate on Scroll ======================
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  });
  animateElements.forEach(el => observer.observe(el));

  // Reveal on scroll fallback
  const revealOnScroll = () => {
    animateElements.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        item.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// ====================== Slider ======================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slider__slide');
  const dotsContainer = document.querySelector('.slider__dots');
  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;

  // Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider__dots button');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  setInterval(autoSlide, 8000);
  showSlide(0);
});

// ====================== Clients Slider ======================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".clients-track");
  const slides = document.querySelectorAll(".client-slide");
  const dots = document.querySelectorAll(".clients-dots .dot");

  if (!track || !slides.length || !dots.length) return; // Safety check

  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // Handle dot click navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  // Auto-slide every 4 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 4000);

  // Initialize first slide
  showSlide(currentIndex);
});


// =======================
// MODAL FUNCTIONALITY
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const modalImage = modal.querySelector(".modal-content img");
  const modalTitle = modal.querySelector(".modal-content h3");
  const modalDescription = modal.querySelector(".modal-content p");
  const reviewsContainer = modal.querySelector(".reviews-section");
  const modalClose = modal.querySelector(".modal-close");
  const readMoreButtons = document.querySelectorAll(".read-more");

  readMoreButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Retrieve data attributes
      const product = button.getAttribute("data-product");
      const imageSrc = button.getAttribute("data-image");
      const description = button.getAttribute("data-description");
      const reviewsData = button.getAttribute("data-reviews");

      // Fill modal with data
      modalImage.src = imageSrc;
      modalTitle.textContent = product;
      modalDescription.textContent = description;

      // Generate reviews
      reviewsContainer.innerHTML = "";
      try {
        const reviews = JSON.parse(reviewsData);
        if (reviews.length > 0) {
          const reviewsHTML = reviews.map(
            r => `
              <div class="review-item">
                <p>"${r.review}"</p>
                <small>- ${r.name}</small>
              </div>
            `
          ).join("");
          reviewsContainer.innerHTML = `
            <h4>Customer Reviews:</h4>
            ${reviewsHTML}
          `;
        }
      } catch (err) {
        console.error("Invalid reviews JSON:", err);
      }

      // Show modal
      modal.classList.add("show");
      document.body.classList.add("modal-open");
    });
  });

  // Close modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  });

  // Close when clicking outside modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      document.body.classList.remove("modal-open");
    }
  });
});