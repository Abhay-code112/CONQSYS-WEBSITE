document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dark Mode Toggle
  const toggle = document.getElementById('modeToggle');
  const body = document.body;
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
  }
  
  toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100; // Adjust speed here
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, 20);
    });
  }

  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('summary')) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  const summarySection = document.querySelector('.summary');
  if (summarySection) {
    observer.observe(summarySection);
  }

  // Auto-hide flash messages
  setTimeout(() => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
      message.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => {
        message.remove();
      }, 300);
    });
  }, 5000);

  // Add loading animation to form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Re-enable after a delay (in case of errors)
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 10000);
    });
  }

  // Parallax effect for banner
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const banner = document.querySelector('.banner-img');
    
    if (banner) {
      const speed = scrolled * 0.5;
      banner.style.transform = `translateY(${speed}px)`;
    }
  });

  // Active navigation highlighting
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Add typing effect to banner text
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }
    typing();
  }

  // Initialize typing effect for banner
  const bannerTitle = document.querySelector('.banner-text h1');
  const bannerSubtitle = document.querySelector('.banner-text p');
  
  if (bannerTitle && bannerSubtitle) {
    const titleText = bannerTitle.textContent;
    const subtitleText = bannerSubtitle.textContent;
    
    setTimeout(() => {
      typeWriter(bannerTitle, titleText, 80);
      setTimeout(() => {
        typeWriter(bannerSubtitle, subtitleText, 50);
      }, titleText.length * 80 + 500);
    }, 1000);
  }

  // Card hover effects with 3D transform
  const cards = document.querySelectorAll('.card, .tech-card, .industry-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0)';
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Mobile menu toggle (if needed)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
  }

  // Scroll to top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), #0077b6);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Form validation enhancement
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '' && this.hasAttribute('required')) {
        this.style.borderColor = '#dc3545';
        this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
      } else {
        this.style.borderColor = '#28a745';
        this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
      }
    });

    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--primary-color)';
      this.style.boxShadow = '0 0 0 3px rgba(0, 87, 146, 0.1)';
    });
  });

  // Technology cards rotation effect
  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) rotateY(10deg) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateY(0) scale(1)';
    });
  });

  // Industry cards stagger animation
  const industryCards = document.querySelectorAll('.industry-card');
  const industryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        industryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  industryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animationDelay = `${index * 0.1}s`;
    industryObserver.observe(card);
  });

  // Newsletter subscription (if you want to add this feature)
  function addNewsletterSubscription() {
    const footer = document.querySelector('.footer-advanced .footer-container');
    const newsletterHTML = `
      <div class="newsletter-section" style="margin: 30px 0; padding: 30px; background: rgba(255,255,255,0.1); border-radius: 15px; backdrop-filter: blur(10px);">
        <h3 style="margin-bottom: 15px; color: #fff;">Stay Updated</h3>
        <p style="margin-bottom: 20px; opacity: 0.9;">Subscribe to our newsletter for latest updates and insights.</p>
        <form class="newsletter-form" style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
          <input type="email" placeholder="Enter your email" required 
                 style="flex: 1; min-width: 250px; padding: 12px; border: none; border-radius: 8px; background: rgba(255,255,255,0.9);">
          <button type="submit" 
                  style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
            Subscribe
          </button>
        </form>
      </div>
    `;
    
    if (footer) {
      footer.insertAdjacentHTML('beforeend', newsletterHTML);
      
      // Handle newsletter submission
      const newsletterForm = document.querySelector('.newsletter-form');
      if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;
          
          // Here you would typically send the email to your backend
          console.log('Newsletter subscription:', email);
          
          // Show success message
          this.innerHTML = '<p style="color: #28a745; margin: 0;">✓ Thank you for subscribing!</p>';
        });
      }
    }
  }

  // Uncomment the line below if you want to add newsletter functionality
  // addNewsletterSubscription();

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
  }, 16); // ~60fps

  window.addEventListener('scroll', debouncedScrollHandler);

  // Add CSS animations dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOutRight {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .nav a.active {
      background-color: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }
    
    .nav a.active::after {
      width: 100%;
    }
    
    .lazy {
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .lazy.loaded {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  console.log('🚀 ConQsys website loaded successfully!');
});