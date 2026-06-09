// SADU MATE - Landing Page JavaScript
// Vanilla JS - No frameworks

document.addEventListener('DOMContentLoaded', function() {
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

  const infoText =
  document.getElementById('combo-info-text');

  if (comboValue === '1') {

    infoText.textContent =
    '1 Hộp 250g - Tổng 229.000đ';

  }

  else if (comboValue === '3') {

    infoText.textContent =
    'Combo 3 Hộp + Tặng 1 - 567.000đ';

  }

  else {

    infoText.textContent =
    'Combo 5 Hộp + Tặng 2 - 945.000đ';

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
      const address = document.getElementById('form-address').value.trim();
      const comboValue = document.getElementById('combo-select').value;
      
      // Validation
      if (!name || !phone || !address) {
        alert('Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!');
        return;
      }
      
      // Get combo info
     let comboText = '';

if (comboValue === '1') {

  comboText = '1 Hộp 250g (199.000đ + 30.000đ ship)';

}
else if (comboValue === '3') {

  comboText = 'Combo 3 Hộp + Tặng 1';


}
else {

  comboText = 'Combo 5 Hộp + Tặng 2';

}
      // Show success message
      let total = '';

if(comboValue === '1'){
  total = '229.000đ';
}

else if(comboValue === '3'){
  total = '567.000đ';
}

else{
  total = '945.000đ';
}

fetch(
'https://script.google.com/macros/s/AKfycbwCSeyTtwJ1mYYmRexIlBcC_tN9dXFWNlU4gRe68jOjy13hqkpG_J73aff7lmd8lAdT/exec',
{
  method:'POST',

  headers:{
    'Content-Type':'application/json'
  },

  body:JSON.stringify({

    name:name,

    phone:phone,

    address:address,

    product:comboText,

    total:total

  })

})

.then(response => response.text())

.then(data => {

  alert(
`🎉 ĐẶT HÀNG THÀNH CÔNG

Họ tên: ${name}

SĐT: ${phone}

Địa chỉ: ${address}

Sản phẩm: ${comboText}

Tổng thanh toán: ${total}

Chúng tôi sẽ liên hệ xác nhận đơn hàng trong ít phút.`
  );

  form.reset();

})

.catch(error => {

  alert(
'Có lỗi gửi đơn hàng. Vui lòng thử lại.'
  );

  console.error(error);

});
    
      
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
function countdown() {

let end = new Date();

end.setHours(23,59,59);

setInterval(()=>{

let now = new Date();

let distance = end - now;

let h = Math.floor(distance/(1000*60*60));

let m = Math.floor(
(distance%(1000*60*60))/(1000*60)
);

let s = Math.floor(
(distance%(1000*60))/1000
);

let timer =
document.getElementById("countdown");

if(timer){

timer.innerHTML =
h + "h " + m + "m " + s + "s";

}

},1000);

}

countdown();