document.addEventListener("DOMContentLoaded", () => {
  // ======================
  // Menu Toggle & Dropdown on Mobile
  // ======================
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  const dropdownLinks = document.querySelectorAll('.dropdown > a');

  menuToggle?.addEventListener('click', () => {
    navbar?.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('active');
      }
    });
  });

  // ======================
  // Scroll Header Hide/Show
  // ======================
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY && currentScroll > 100) {
      // Scrolling down → hide header
      document.body.classList.add('header-hidden');
    } else {
      // Scrolling up → show header
      document.body.classList.remove('header-hidden');
    }

    lastScrollY = currentScroll;
  });

  // ======================
  // WhatsApp Get Quote Buttons
  // ======================
  const whatsappNumber = "254700780203";
  document.querySelectorAll(".get-quote").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const product = btn.getAttribute("data-product");
      const message = `Hello! I'm interested in getting a quote for ${product}. Please share more details.`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  });

  // ======================
  // Footer Year Update
  // ======================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ======================
  // Animate on Scroll
  // ======================
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

  // ======================
  // Slider
  // ======================
  const slides = document.querySelectorAll('.slider__slide');
  const dotsContainer = document.querySelector('.slider__dots');
  if (slides.length && dotsContainer) {
    let currentIndex = 0;

    // Create dots dynamically
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('button');

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

    setInterval(autoSlide, 8000); // Adjusted to 8 seconds for typical UX
    showSlide(0);
  }

  // ======================
  // Clients Slider
  // ======================
  const track = document.querySelector(".clients-track");
  const clientSlides = document.querySelectorAll(".client-slide");
  const clientDots = document.querySelectorAll(".clients-dots .dot");

  if (track && clientSlides.length && clientDots.length) {
    let currentIndex = 0;
    const totalSlides = clientSlides.length;

    function showClientSlide(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      clientDots.forEach(dot => dot.classList.remove("active"));
      clientDots[index].classList.add("active");
    }

    clientDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentIndex = i;
        showClientSlide(currentIndex);
      });
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      showClientSlide(currentIndex);
    }, 4000);

    showClientSlide(currentIndex);
  }

  // ======================
  // Modal Functionality
  // ======================
  const modal = document.getElementById("accessoryModal");
  if (modal) {
    const modalImage = modal.querySelector("#modalImage");
    const modalTitle = modal.querySelector("#modalTitle");
    const modalDescription = modal.querySelector("#modalDescription");
    const reviewsContainer = modal.querySelector("#modalReviews");
    const modalClose = modal.querySelector(".modal-close");
    const modalQuoteBtn = modal.querySelector("#modalQuoteBtn");

    const readMoreButtons = document.querySelectorAll(".read-more");

    readMoreButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        const product = button.getAttribute("data-product");
        const imageSrc = button.getAttribute("data-image");
        const description = button.getAttribute("data-description");
        const reviewsData = button.getAttribute("data-reviews");

        modalImage.src = imageSrc;
        modalImage.alt = product;
        modalTitle.textContent = product;
        modalDescription.textContent = description;

        // Generate Reviews List
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

        // Update WhatsApp quote button href with message including product name
        const whatsappMessage = `Hello! I'm interested in getting a quote for ${product}. Please share more details.`;
        modalQuoteBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        modal.classList.add("show");
        document.body.classList.add("modal-open");
      });
    });

    modalClose.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
      }
    });

    // Optional: close modal on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
      }
    });
  }
});
