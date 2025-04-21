// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const videoBtn = document.querySelector('.video-demo-btn');
const closeModal = document.querySelector('.close-modal');
const videoIframe = document.querySelector('.video-container iframe');

// Sample video URL (this would normally come from a database or API)
const sampleVideoUrl = 'https://www.youtube.com/embed/9vJRopau0g0'; // Example: motivation video

// Open modal when video button is clicked
if (videoBtn) {
    videoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Set the video URL
        videoIframe.src = sampleVideoUrl;
        
        // Show the modal
        videoModal.style.display = 'flex';
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            videoModal.classList.add('active');
        }, 10);
    });
}

// Close modal when X is clicked
if (closeModal) {
    closeModal.addEventListener('click', () => {
        closeVideoModal();
    });
}

// Close modal when clicking outside the video
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// Close modal when ESC key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        closeVideoModal();
    }
});

// Function to close the video modal
function closeVideoModal() {
    // Remove active class first (for animation)
    videoModal.classList.remove('active');
    
    // After animation completes, hide modal and stop video
    setTimeout(() => {
        videoModal.style.display = 'none';
        videoIframe.src = '';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Service Items Animation
const serviceItems = document.querySelectorAll('.service-item');
if (serviceItems.length > 0) {
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease';
    });
    
    const animateServiceItems = () => {
        serviceItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };
    
    window.addEventListener('scroll', animateServiceItems);
    window.addEventListener('load', animateServiceItems);
}

// How It Works Steps Animation
const stepItems = document.querySelectorAll('.step-item');
if (stepItems.length > 0) {
    stepItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
    });
    
    const animateStepItems = () => {
        stepItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };
    
    window.addEventListener('scroll', animateStepItems);
    window.addEventListener('load', animateStepItems);
}

// Pricing Cards Animation
const pricingCards = document.querySelectorAll('.pricing-card');
if (pricingCards.length > 0) {
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    const animatePricingCards = () => {
        pricingCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };
    
    window.addEventListener('scroll', animatePricingCards);
    window.addEventListener('load', animatePricingCards);
} 