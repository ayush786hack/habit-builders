// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Handle redirection from services page
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're coming from the services page
    const urlParams = new URLSearchParams(window.location.search);
    const fromServices = urlParams.get('from') === 'services';
    
    if (fromServices) {
        // First, ensure we're at the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        
        // Then wait for the next frame
        requestAnimationFrame(() => {
            // Force a reflow
            document.body.offsetHeight;
            
            // Show the auth container
            const authContainer = document.querySelector('.auth-container');
            if (authContainer) {
                // Reset any existing styles
                authContainer.style.cssText = '';
                
                // Set initial styles
                authContainer.style.display = 'block';
                authContainer.style.visibility = 'visible';
                authContainer.style.position = 'relative';
                authContainer.style.top = '0';
                authContainer.style.left = '0';
                authContainer.style.width = '100%';
                authContainer.style.height = 'auto';
                authContainer.style.opacity = '1';
                authContainer.style.transform = 'none';
                
                // Force another reflow
                authContainer.offsetHeight;
                
                // Ensure we're still at the top
                window.scrollTo({
                    top: 0,
                    behavior: 'instant'
                });
            }
        });
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .timeline-item, .section-title');
    const animatedElements = new Set();
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            if (!animatedElements.has(element)) {
                element.classList.add('animate');
                animatedElements.add(element);
            }
        }
    });
};

// Debounce function to improve performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

window.addEventListener('scroll', debounce(animateOnScroll, 100));
window.addEventListener('load', animateOnScroll);

// Generate random motivational quotes
const quotes = [
    "The only way to do great work is to love what you do.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Your habits will determine your future.",
    "Small daily improvements are the key to staggering long-term results.",
    "Success usually comes to those who are too busy to be looking for it.",
    "The secret of getting ahead is getting started.",
    "Don't count the days, make the days count.",
    "The difference between ordinary and extraordinary is that little extra.",
    "You don't have to be great to start, but you have to start to be great."
];

// Function to get a random quote without repeating
let lastQuoteIndex = -1;
const getRandomQuote = () => {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastQuoteIndex && quotes.length > 1);
    lastQuoteIndex = randomIndex;
    return quotes[randomIndex];
};

// Set daily quote if element exists
const quoteElement = document.querySelector('.daily-quote');
if (quoteElement) {
    quoteElement.textContent = getRandomQuote();
}

// Journey Timeline scroll animation
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease';
    });

    const animateTimeline = () => {
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200); // Staggered animation
            }
        });
    };

    window.addEventListener('scroll', debounce(animateTimeline, 100));
    window.addEventListener('load', animateTimeline);
}

// Feature cards animation
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length > 0) {
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });

    const animateFeatureCards = () => {
        featureCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150); // Staggered animation
            }
        });
    };

    window.addEventListener('scroll', debounce(animateFeatureCards, 100));
    window.addEventListener('load', animateFeatureCards);
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll functionality
    const scrollButtons = document.querySelectorAll('[data-scroll]');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Add animation class to the subscription cards
                const subscriptionCards = document.querySelectorAll('.subscription-card');
                subscriptionCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(50px)';
                });

                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Animate the subscription cards after a short delay
                setTimeout(() => {
                    subscriptionCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.5s ease-out';
                        }, index * 200); // Stagger the animations
                    });
                }, 500);
            }
        });
    });
}); 