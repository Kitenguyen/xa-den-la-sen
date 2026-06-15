// SADU MATE - Landing Page JavaScript
// Vanilla JS - No frameworks

document.addEventListener('DOMContentLoaded', function () {
  initFormSubmission();
  initScrollAnimations();
  initSmoothScroll();
});


// ============ Combo Selection ============
function initComboSelection() {
  const comboCards = document.querySelectorAll('.combo-card');
  const selectedComboInput = document.getElementById('selected-combo');

  comboCards.forEach(card => {
    card.addEventListener('click', function () {
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
    form.addEventListener('submit', function (e) {
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

        comboText = '1 Hộp 250g (149.000đ + 30.000đ ship)';

      }
      else if (comboValue === '3') {

        comboText = 'Combo 3 Hộp + Tặng 1 Hộp + Tặng Ống hút trà Inox 304 + Xúc trà gỗ';


      }
      else {

        comboText = 'Combo 5 Hộp + Tặng 2 Hộp + Tặng Ống hút trà Inox 304 + Xúc trà gỗ';

      }
      // Show loading/pending state on submit button
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonHTML = submitButton ? submitButton.innerHTML : 'Đang gửi đơn...';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('btn-loading');
        submitButton.innerHTML = 'Đang gửi đơn...';
      }

      let total = '';

      if (comboValue === '1') {
        total = '179.000đ';
      }

      else if (comboValue === '3') {
        total = '447.000đ';
      }

      else {
        total = '745.000đ';
      }

      fetch(
        'https://script.google.com/macros/s/AKfycbwCSeyTtwJ1mYYmRexIlBcC_tN9dXFWNlU4gRe68jOjy13hqkpG_J73aff7lmd8lAdT/exec',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({

            name: name,

            phone: phone,

            address: address,

            product: comboText,

            total: total

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

        })
        .finally(() => {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-loading');
            submitButton.innerHTML = originalButtonHTML;
          }
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

  const observer = new IntersectionObserver(function (entries) {
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
    anchor.addEventListener('click', function (e) {
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

  window.addEventListener('scroll', function () {
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
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// Initialize all on page load
window.addEventListener('load', function () {
  initParallax();
  initLazyLoad();
  initMobileMenu();
});
function countdown() {

  let end = new Date();

  end.setHours(23, 59, 59);

  setInterval(() => {

    let now = new Date();

    let distance = end - now;

    let h = Math.floor(distance / (1000 * 60 * 60));

    let m = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );

    let s = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    let timer =
      document.getElementById("countdown");

    if (timer) {

      timer.innerHTML =
        h + "h " + m + "m " + s + "s";

    }

  }, 1000);

}

countdown();
function initFakeOrders() {

  const customers = [
    "Hương Nguyễn",
    "Minh Anh",
    "Lan Phương",
    "Đức Thành",
    "Quỳnh Chi",
    "Ngọc Mai",
    "Thu Trang",
    "Hoàng Nam",
    "Thanh Tùng",
    "Kim Oanh",
    "Tuấn Anh",
    "Hà Linh"
  ];

  const products = [
     "1 Hộp 150g",
  "Combo 3 Hộp + Tặng 1 + Quà tặng",
  "Combo 5 Hộp + Tặng 2 + Quà tặng"
  ];

  const popup =
    document.getElementById("order-notification");

  const message =
    document.getElementById("order-message");

  function showNotification() {

    const customer =
      customers[Math.floor(Math.random() * customers.length)];

    const product =
      products[Math.floor(Math.random() * products.length)];

    message.innerHTML =
      `🛒 <strong>${customer}</strong><br>vừa đặt <strong>${product}</strong>`;

    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 5000);
  }

  setTimeout(showNotification, 3000);

  setInterval(showNotification, 12000);
}

initFakeOrders();
function initFeedbackSlider(){

  const slides =
  document.querySelectorAll('.feedback-slide');

  const prev =
  document.querySelector('.feedback-prev');

  const next =
  document.querySelector('.feedback-next');

  if(!slides.length) return;

  let current = 0;

  function showSlide(index){

    slides.forEach(slide =>
      slide.classList.remove('active')
    );

    slides[index].classList.add('active');
  }

  next.addEventListener('click',()=>{

    current++;

    if(current >= slides.length){
      current = 0;
    }

    showSlide(current);

  });

  prev.addEventListener('click',()=>{

    current--;

    if(current < 0){
      current = slides.length - 1;
    }

    showSlide(current);

  });

  setInterval(()=>{

    current++;

    if(current >= slides.length){
      current = 0;
    }

    showSlide(current);

  },3000);

}

window.addEventListener('load',function(){

  initFeedbackSlider();

});