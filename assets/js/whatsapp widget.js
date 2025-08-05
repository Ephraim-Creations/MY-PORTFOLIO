// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Check if widget exists on page
  const widget = document.querySelector('.whatsapp-widget');
  if (!widget) return;

  // Real-time EAT Clock
  function updateEATTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: 'Africa/Nairobi',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace('AM','').replace('PM','').trim();
    
    const timeElements = document.querySelectorAll('.time, .message-time');
    timeElements.forEach(el => el.textContent = timeString);
  }

  // Toggle Functionality
  const toggleBtn = document.querySelector('.widget-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      widget.classList.add('active');
      toggleBtn.classList.add('hidden');
    });
  }

  // Close Functionality
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      widget.classList.remove('active');
      if (toggleBtn) toggleBtn.classList.remove('hidden');
    });
  }

  // Initialize
  updateEATTime();
  setInterval(updateEATTime, 60000);
  setTimeout(() => {
    if (toggleBtn) toggleBtn.classList.add('pulse');
  }, 8000);

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!widget.contains(e.target) && 
        !(toggleBtn && toggleBtn.contains(e.target))) {
      widget.classList.remove('active');
      if (toggleBtn) toggleBtn.classList.remove('hidden');
    }
  });
});

//back to TOP
  const backToTopBtn = document.getElementById("backToTop");
  let hideTimer;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add("show");

      // Reset hide timer
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        backToTopBtn.classList.remove("show");
      }, 5000);
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });