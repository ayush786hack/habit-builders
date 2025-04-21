// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Form fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        resetErrors();
        
        // Validate form
        let isValid = true;
        
        // Validate name (minimum 2 characters)
        if (!nameInput.value || nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter your full name (at least 2 characters)';
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate subject (minimum 3 characters)
        if (!subjectInput.value || subjectInput.value.trim().length < 3) {
            subjectError.textContent = 'Please enter a subject (at least 3 characters)';
            isValid = false;
        }
        
        // Validate message (minimum 10 characters)
        if (!messageInput.value || messageInput.value.trim().length < 10) {
            messageError.textContent = 'Please enter your message (at least 10 characters)';
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            // In a real application, we would send an AJAX request to a server
            // Here we'll just simulate a successful submission
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'flex';
                
                // Reset form for if user navigates back
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Auto scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        }
    });
}

// Reset all error messages
function resetErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
}

// Email validation using regex
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// FAQ Accordion
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

// Info Cards Animation
const infoCards = document.querySelectorAll('.info-card');
if (infoCards.length > 0) {
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    const animateInfoCards = () => {
        infoCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };
    
    window.addEventListener('scroll', animateInfoCards);
    window.addEventListener('load', animateInfoCards);
} 