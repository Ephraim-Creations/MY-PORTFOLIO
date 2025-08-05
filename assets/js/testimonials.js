document.addEventListener('DOMContentLoaded', () => {
    const reviews = [
        {
            name: "Ian Kinyua",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg",
            rating: 5,
            date: "16 weeks ago",
            text: "Excellent service! Keep up with your castomer services",
            verified: true
        },
        {
            name: "Newton Murimi",
            avatar: "https://randomuser.me/api/portraits/men/91.jpg",
            rating: 4,
            date: "4 weeksago",
            text: "I had an awesome experience working with Ephraim creations on my website! From start to finish, the process was smooth and worth the investment.",
            verified: true
        },
        {
            name: "Gladys Gatwiri",
            avatar: "https://randomuser.me/api/portraits/women/16.jpg",
            rating: 5,
            date: "12 weeks ago",
            text: "Absolutely fantastic! They understood exactly what I needed and delivered perfect results.",
            verified: true
        },
        {
            name: "Nax Grapher",
            avatar: "https://randomuser.me/api/portraits/men/75.jpg",
            rating: 5,
            date: "16 weeks ago",
            text: "Ephraim Creations did an excellent job building my e-commerce website. It looks great and functions perfectly. Highly recommend their services!",
            verified: true
        },
        {
            name: "Elizabeth",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            rating: 4,
            date: "1 week ago",
            text: "We partnered with Ephraim Creations for a full rebrand and website redesign, and the results were beyond what we expected. ",
            verified: true
        },
        {
            name: "Omondi Okoth",
            avatar: "https://randomuser.me/api/portraits/men/91.jpg",
            rating: 5,
            date: "20 weeks ago",
            text: "I've worked with many providers, but this team stands out. Top-notch expertise and service!",
            verified: false
        },
        {
            name: "Jackline",
            avatar: "https://randomuser.me/api/portraits/women/93.jpg",
            rating: 5,
            date: "3 weeks ago",
            text: "Exceptional from start to finish. Went above and beyond to ensure I was happy.",
            verified: true
        },
        {
            name: "Fred Mutua",
            avatar: "https://randomuser.me/api/portraits/men/55.jpg",
            rating: 4,
            date: "8 weeks ago",
            text: "Great work at a fair price. Responsive team that addressed all my concerns promptly.",
            verified: true
        }
    ];

    const container = document.querySelector('.reviews-container');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;
    let slideInterval;

    function renderReviews() {
        container.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.name}" class="avatar">
                    <div class="reviewer-info">
                        <div class="reviewer-name">
                            ${review.name}
                            ${review.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                        </div>
                        <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <span class="google-g">G</span>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');

        renderDots();
        updateSlide();
    }

    function renderDots() {
        const visibleCards = window.innerWidth >= 900 ? 4 : window.innerWidth >= 600 ? 2 : 1;
        const dotCount = Math.ceil(reviews.length / visibleCards);
        
        dotsContainer.innerHTML = Array(dotCount).fill().map((_, i) => 
            `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i * visibleCards}"></div>`
        ).join('');

        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateSlide();
                resetInterval();
            });
        });
    }

    function updateSlide() {
        const cardWidth = document.querySelector('.review-card').offsetWidth + 16;
        container.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });

        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === Math.floor(currentIndex / (window.innerWidth >= 900 ? 4 : window.innerWidth >= 600 ? 2 : 1)));
        });
    }

    function startInterval() {
        slideInterval = setInterval(() => {
            const visibleCards = window.innerWidth >= 900 ? 4 : window.innerWidth >= 600 ? 2 : 1;
            currentIndex = (currentIndex + visibleCards) % reviews.length;
            updateSlide();
        }, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    window.addEventListener('resize', () => {
        renderDots();
        updateSlide();
    });

    // Initialize
    renderReviews();
    startInterval();

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(slideInterval));
    container.addEventListener('mouseleave', startInterval);
});