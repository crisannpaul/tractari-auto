window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect
    if (heroContent) {
        heroContent.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }

    // Fade-in
    checkFadeIn();
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function () {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Hero carousel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Fade-in on scroll
function checkFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('load', () => {
    checkFadeIn();

    // Fade-in body on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service cards hover effect
document.querySelectorAll('.service-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

const servicesCarousel = document.getElementById('servicesCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const servicesDots = document.getElementById('servicesDots');

const serviceItems = document.querySelectorAll('.service-item');
let itemsPerView = window.innerWidth <= 768 ? 1 : 3;
let totalItems = serviceItems.length;
let currentServiceIndex = 0;
let maxIndex = totalItems - itemsPerView;

// Update maxIndex on resize
window.addEventListener('resize', () => {
  itemsPerView = window.innerWidth <= 768 ? 1 : 3;
  maxIndex = totalItems - itemsPerView;
  goToServiceSlide(0); // Reset to first slide on resize
});

function updateServicesCarousel() {
  // Move carousel by % (each slide width = 100% / itemsPerView)
  const slideWidthPercent = 100 / itemsPerView;
  const translateXPercent = -currentServiceIndex * slideWidthPercent;

  servicesCarousel.style.transform = `translateX(${translateXPercent}%)`;

  // Update dots and active slide class
  serviceItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentServiceIndex);
  });

  document.querySelectorAll('.service-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentServiceIndex);
  });
}

function goToServiceSlide(index) {
  if (index < 0) {
    currentServiceIndex = maxIndex; // Loop to end
  } else if (index > maxIndex) {
    currentServiceIndex = 0; // Loop to start
  } else {
    currentServiceIndex = index;
  }
  updateServicesCarousel();
}

prevBtn.addEventListener('click', () => {
  goToServiceSlide(currentServiceIndex - 1);
});

nextBtn.addEventListener('click', () => {
  goToServiceSlide(currentServiceIndex + 1);
});

// Auto-slide every 4 seconds
setInterval(() => {
  goToServiceSlide(currentServiceIndex + 1);
}, 4000);

// Initialize dots (only once)
if (servicesDots) {
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('div');
    dot.className = 'service-dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToServiceSlide(i));
    servicesDots.appendChild(dot);
  }
}

updateServicesCarousel();
