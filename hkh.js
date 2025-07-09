document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Hamburger menu
 const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          navMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && e.target !== hamburger) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('show')) {
          hamburger.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('show');
        }
      }
    });
  });

  // Main slideshow
  let autoSlideIndex = 0;
  const autoSlideInterval = 5000;
  let autoSlideTimer;

  function startAutoSlideshow() {
    showAutoSlides();
    autoSlideTimer = setInterval(showAutoSlides, autoSlideInterval);
  }

  function showAutoSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    if (!slides.length || !dots.length) return;
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    
    autoSlideIndex++;
    if (autoSlideIndex > slides.length) autoSlideIndex = 1;
    
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    
    slides[autoSlideIndex-1].style.display = "block";  
    dots[autoSlideIndex-1].classList.add("active");
  }

  // Manual slide control
  function currentSlide(n) {
    clearInterval(autoSlideTimer);
    autoSlideIndex = n - 1;
    showAutoSlides();
    autoSlideTimer = setInterval(showAutoSlides, autoSlideInterval);
  }

  // Initialize slideshow
  startAutoSlideshow();

  // Pause on hover
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideTimer);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
      startAutoSlideshow();
    });
  }

  // Voices slideshow
  // Add this to your existing hkh.js file, replacing any existing voices slideshow code

// Voices Slideshow
let voiceSlideIndex = 1;
showVoiceSlides(voiceSlideIndex);

function plusVoiceSlides(n) {
  showVoiceSlides(voiceSlideIndex += n);
}

function currentVoiceSlide(n) {
  showVoiceSlides(voiceSlideIndex = n);
}

function showVoiceSlides(n) {
  let i;
  const slides = document.getElementsByClassName("voices");
  const dots = document.getElementsByClassName("demo");
  const captionText = document.getElementById("voices-cap");
  
  if (!slides.length) return;
  
  if (n > slides.length) { voiceSlideIndex = 1 }
  if (n < 1) { voiceSlideIndex = slides.length }
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // Update dot indicators
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  
  // Show current slide
  slides[voiceSlideIndex-1].style.display = "block";  
  if (dots.length > 0) {
    dots[voiceSlideIndex-1].classList.add("active");
  }
  if (captionText) {
    captionText.textContent = dots[voiceSlideIndex-1].alt;
  }
}

// Make functions available globally for HTML onclick attributes
window.plusVoiceSlides = plusVoiceSlides;
window.currentVoiceSlide = currentVoiceSlide;
  
  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          lazyLoadObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.dataset.src = img.src;
      img.src = '';
      lazyLoadObserver.observe(img);
    });
  }
});

// Fallback for browsers that don't support ES6 modules
if (!window.currentSlide) {
  window.currentSlide = function(n) {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    setTimeout(() => currentSlide(n), 100);
  };
  
  window.plusVoiceSlides = function(n) {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    setTimeout(() => plusVoiceSlides(n), 100);
  };
  
  window.currentVoiceSlide = function(n) {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    setTimeout(() => currentVoiceSlide(n), 100);
  };
}
