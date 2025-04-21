// Testimonial Slider
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

// Animate team members on scroll
const teamMembers = document.querySelectorAll('.team-member');
if (teamMembers.length > 0) {
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.5s ease';
    });
    
    const animateTeamMembers = () => {
        teamMembers.forEach((member, index) => {
            const memberPosition = member.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (memberPosition < screenPosition) {
                setTimeout(() => {
                    member.style.opacity = '1';
                    member.style.transform = 'translateY(0)';
                }, index * 150); // Staggered animation
            }
        });
    };
    
    window.addEventListener('scroll', animateTeamMembers);
    window.addEventListener('load', animateTeamMembers);
}

// Animate psychology items on scroll
const psychologyItems = document.querySelectorAll('.psychology-item');
if (psychologyItems.length > 0) {
    psychologyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
    });
    
    const animatePsychologyItems = () => {
        psychologyItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150); // Staggered animation
            }
        });
    };
    
    window.addEventListener('scroll', animatePsychologyItems);
    window.addEventListener('load', animatePsychologyItems);
} 