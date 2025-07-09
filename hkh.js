    // Improved JavaScript with modern features and error handling
    document.addEventListener('DOMContentLoaded', () => {
      // Hamburger menu with ARIA attributes
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('nav-menu');
      
      if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
          const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
          hamburger.setAttribute('aria-expanded', !isExpanded);
          navMenu.classList.toggle('show');
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

      // Your existing slideshow code with some improvements
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

      // Initialize slideshow
      startAutoSlideshow();

      // Pause on hover for better UX
      const slideshowContainer = document.querySelector('.slideshow-container');
      if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
          clearInterval(autoSlideTimer);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
          startAutoSlideshow();
        });
      }

      // Your existing voice slides code
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
  let slides = document.getElementsByClassName("voices");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("voices-cap");
  
  if (n > slides.length) { voiceSlideIndex = 1 }
  if (n < 1) { voiceSlideIndex = slides.length }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[voiceSlideIndex-1].style.display = "block";  
  dots[voiceSlideIndex-1].className += " active";
  captionText.innerHTML = dots[voiceSlideIndex-1].alt;
}

      // ... rest of your existing JS ...
    });

    // Your other functions remain similar but could be modernized
