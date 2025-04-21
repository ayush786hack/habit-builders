// AI Chat Simulation
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.btn-send');
const upgradePrompt = document.querySelector('.upgrade-prompt');

// Simulated AI responses for the demo
const aiResponses = [
    "As a free user, I can only provide limited responses. Upgrade to Premium for personalized guidance tailored to your specific situation!",
    "That's a great question! Free users get basic answers, but Premium users receive detailed, customized coaching. Upgrade to get the most out of your habit-building journey!",
    "I'd love to help more with that specific question! Premium users get unlimited in-depth coaching on their unique challenges.",
    "Our Premium AI provides detailed step-by-step guidance for questions like this. Would you like to upgrade to access full features?"
];

// If elements exist, set up chat simulation for demo
if (chatInput && sendButton) {
    // Simulate user typing and sending a message
    chatInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            // This is just to demonstrate - in reality buttons are disabled for free users
            showUpgradePrompt();
        }
    });
    
    sendButton.addEventListener('click', () => {
        if (chatInput.value.trim() !== '') {
            // This is just to demonstrate - in reality buttons are disabled for free users
            showUpgradePrompt();
        }
    });
    
    // Delayed appearance of upgrade prompt
    setTimeout(() => {
        showUpgradePrompt();
    }, 2000);
}

function showUpgradePrompt() {
    if (upgradePrompt) {
        upgradePrompt.style.opacity = '0';
        upgradePrompt.style.display = 'flex';
        
        setTimeout(() => {
            upgradePrompt.style.opacity = '1';
        }, 10);
    }
}

// Testimonial Slider - Similar to about.js
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (testimonialSlider && testimonialItems.length > 0) {
    let currentIndex = 0;
    const itemCount = testimonialItems.length;
    
    // Set up the initial state
    updateSlider();
    
    // Previous button click handler
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateSlider();
        });
    }
    
    // Next button click handler
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateSlider();
        });
    }
    
    // Auto-advance the slider every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateSlider();
    }, 5000);
    
    // Update the slider display
    function updateSlider() {
        testimonialItems.forEach((item, index) => {
            // Hide all items
            item.style.display = 'none';
            
            // Show only the current item
            if (index === currentIndex) {
                item.style.display = 'block';
                item.style.opacity = 0;
                
                // Fade in animation
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease';
                    item.style.opacity = 1;
                }, 10);
            }
        });
    }
}

// FAQ Accordion - Similar to contact.js
const accordionItems = document.querySelectorAll('.accordion-item');

if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = header.querySelector('i');
        
        // Set initial state
        content.style.maxHeight = '0px';
        
        header.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle icon
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                content.style.maxHeight = '0px';
            }
            
            // Close other accordions
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.accordion-header i');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                    otherContent.style.maxHeight = '0px';
                }
            });
        });
    });
}

// Comparison Table Animation
const comparisonTable = document.querySelector('.comparison-table');
if (comparisonTable) {
    comparisonTable.style.opacity = '0';
    comparisonTable.style.transform = 'translateY(30px)';
    comparisonTable.style.transition = 'all 0.8s ease';
    
    const animateComparisonTable = () => {
        const tablePosition = comparisonTable.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (tablePosition < screenPosition) {
            comparisonTable.style.opacity = '1';
            comparisonTable.style.transform = 'translateY(0)';
        }
    };
    
    window.addEventListener('scroll', animateComparisonTable);
    window.addEventListener('load', animateComparisonTable);
} 