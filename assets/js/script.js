document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeNav = document.querySelector('.close-nav');
    
    hamburger.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeNav.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile nav when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Theme Switcher
const themeSwitcher = document.getElementById('theme-switcher');
const mobileThemeSwitcher = document.getElementById('mobile-theme-switcher');
const currentTheme = localStorage.getItem('theme');

function switchTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeSwitcher.checked = true;
        mobileThemeSwitcher.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeSwitcher.checked = false;
        mobileThemeSwitcher.checked = false;
    }
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeSwitcher.checked = true;
        mobileThemeSwitcher.checked = true;
    }
}

themeSwitcher.addEventListener('change', function() {
    switchTheme(this.checked);
});

mobileThemeSwitcher.addEventListener('change', function() {
    switchTheme(this.checked);
});
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    //modal
    // ===== Data for each plan’s features =====
const planData = {
    Starter: [
      'Up to 5 pages',
      'Free logo Design',
      'Members page (log in)',
      '4 blog publishing',
      '2 free revisions',
      '3 marketing posters',
      'Basic SEO',
      'WhatsApp buttons',
      '1 month support/maintaince',
      'KES 3000 m-pesa setup (if needed)',
    ],
    Business: [
      '10 pages max',
      'Free logo Design',
      'Members page (log in)',
      '6 blog publishing',
      '4 free revisions',
      '5 marketing posters',
      'Advanced SEO', 
      'WhatsApp buttons',
      '2 months support/maintaince',
      'KES 3000 m-pesa setup (if needed)',

    ],
    Ecommerce: [
      'Unlimited pages',
      'Free logo Design',
      'Members page (log in)',
      'Sell online(200 product)',
      '5 free revisions',
      '10 blog (if needed)',
      '10 marketing posters',
      'Premium SEO',
      'WhatsApp buttons',
      'Online payments (m-pesa)',
      'Automated marketing tools',
      'Software integrations (e.g. maps)',
      'Goods delivery to customers',
      '5 month support/maintaince',

    ]
  };
  
  // ===== Grab DOM elements =====
  const modal        = document.getElementById('planModal');
  const modalTitle   = document.getElementById('modalTitle');
  const modalFeatures= document.getElementById('modalFeatures');
  const whatsappBtn  = document.getElementById('whatsappOrder');
  const closeModal   = document.querySelector('.close-modal');
  const planButtons  = document.querySelectorAll('.select-plan');
  
  // ===== Open modal and populate =====
  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.closest('.plan').dataset.plan;
      const features = planData[planName];
  
      // Set title
      modalTitle.textContent = `${planName} Plan Features`;
  
      // Clear and append features
      modalFeatures.innerHTML = '';
      features.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalFeatures.appendChild(li);
      });
  
      // Configure WhatsApp link
      const phone = '254112268873';   // ← replace with your real number
      const text  = encodeURIComponent(
        `Hello Ephraim, I’d like to learn more & order the *${planName}* plan.`
      );
      whatsappBtn.href = `https://wa.me/${phone}?text=${text}`;
      
  
      // Show modal
      modal.classList.add('open');
    });
  });
  
  // ===== Close modal handlers =====
  closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
  });
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
      
  //newsletter
  document.getElementById('subscribe-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const messageDiv = document.getElementById('form-message');
    messageDiv.innerHTML = '';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      const msg = document.createElement('p');
      msg.textContent = data.message;

      if (data.success) {
        msg.className = 'message-success';
        form.reset();
      } else {
        msg.className = 'message-error';
      }

      messageDiv.appendChild(msg);
    })
    .catch(error => {
      const msg = document.createElement('p');
      msg.textContent = "Submission failed: " + error.message;
      msg.className = 'message-error';
      messageDiv.appendChild(msg);
    });
  });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

//js for the portfolio tabs
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const projectCards = document.querySelectorAll(".project-card");

  const filterProjects = (category) => {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (category === "all" || category === cardCategory) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  };

  // Set default active tab to 'websites'
  filterProjects("websites");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".tab-btn.active")?.classList.remove("active");
      button.classList.add("active");
      const category = button.getAttribute("data-category");
      filterProjects(category);
    });
  });
});

//portfolio fullscreen
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('fullscreen-modal');
  const modalImg = document.getElementById('fullscreen-image');
  const closeBtn = document.querySelector('.close-fullscreen');

  document.querySelectorAll('.view-fullscreen').forEach(button => {
    button.addEventListener('click', () => {
      const imageSrc = button.getAttribute('data-image');
      modalImg.src = imageSrc;
      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalImg.src = '';
  });
});

//Below is javascript that switched the black and white images with dialogues
  const themeImage = document.getElementById("themeImage");
  const desktopSwitcher = document.getElementById("theme-switcher");
  const mobileSwitcher = document.getElementById("mobile-theme-switcher");

  function updateThemeImage() {
    const isDarkMode = document.body.classList.contains("dark-mode");

    themeImage.src = isDarkMode
      ? "assets/images/lets-talk-dark.png"
      : "assets/images/lets-talk-light.png";
  }

  // Watch for theme toggles
  desktopSwitcher.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    updateThemeImage();
  });

  mobileSwitcher.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    updateThemeImage();
  });

  // Optional: run on page load
  window.addEventListener("DOMContentLoaded", updateThemeImage);