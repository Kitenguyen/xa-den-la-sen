// SADU MATE - Landing Page JavaScript
// Vanilla JS - No frameworks

document.addEventListener('DOMContentLoaded', function() {
  initComboSelection();
  initFormSubmission();
  initScrollAnimations();
  initSmoothScroll();
});

// ============ Combo Selection ============
function initComboSelection() {
  const comboCards = document.querySelectorAll('.combo-card');
  const selectedComboInput = document.getElementById('selected-combo');

  comboCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      comboCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      this.classList.add('active');
      
      // Update hidden input
      const comboValue = this.getAttribute('data-combo');
      selectedComboInput.value = comboValue;
      
      // Update combo info text
      updateComboInfo(comboValue);
    });
  });

  // Set default selection to combo 5
  const defaultCombo = document.querySelector('[data-combo="5"]');
  if (defaultCombo) {
    defaultCombo.click();
  }
}

function updateComboInfo(comboValue) {
  const infoText = document.getElementById('combo-info-text');
  if (comboValue === '3') {
    infoText.textContent = 'Mua 3 Tặng 1 (567.000đ)';
  } else if (comboValue === '5') {
    infoText.textContent = 'Mua 5 Tặng 2 (945.000đ)';
  }
}

// ============ Form Submission ============
function initFormSubmission() {
  const form = document.getElementById('order-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const comboValue = document.getElementById('selected-combo').value;
      
      // Validation
      if (!name || !phone) {
        alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại!');
        return;
      }
      
      // Get combo info
      let comboText = '';
      if (comboValue === '3') {
        comboText = 'Mua 3 Tặng 1';
      } else if (comboValue === '5') {
        comboText = 'Mua 5 Tặng 2';
      }
      
      // Show success message
      alert(`Cảm ơn bạn! Đơn hàng của bạn sẽ được xác nhận.\n\nThông tin:\nHọ tên: ${name}\nSố điện thoại: ${phone}\nCombo: ${comboText}`);
      
      // Reset form
      form.reset();
      
      // Reset combo selection to default
      const defaultCombo = document.querySelector('[data-combo="5"]');
      if (defaultCombo) {
        defaultCombo.click();
      }
    });
  }
}

// ============ Scroll Animations ============
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============ Smooth Scroll ============
function initSmoothScroll() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============ Parallax Effect ============
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', function() {
    parallaxElements.forEach(el => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = el.offsetTop;
      const distance = scrollPosition - elementOffset;
      const parallaxSpeed = el.getAttribute('data-parallax') || 0.5;
      
      el.style.transform = `translateY(${distance * parallaxSpeed}px)`;
    });
  });
}

// ============ Lazy Load Images ============
function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ============ Mobile Menu (if needed) ============
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// Initialize all on page load
window.addEventListener('load', function() {
  initParallax();
  initLazyLoad();
  initMobileMenu();
});
