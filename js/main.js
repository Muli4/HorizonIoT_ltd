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
