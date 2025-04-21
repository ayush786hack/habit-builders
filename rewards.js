// Upload System Demo
const uploadAreas = document.querySelectorAll('.upload-area');
const fileInputs = document.querySelectorAll('.file-input');
const submitButton = document.querySelector('.btn-submit');
const successResult = document.querySelector('.verification-result.success');
const failureResult = document.querySelector('.verification-result.failure');
const coinAnimation = document.querySelector('.coin-animation');
const coinBalance = document.getElementById('coinBalance');

// Motivational Poster Generator
const generateButton = document.querySelector('.btn-generate');
const posterImage = document.getElementById('posterImage');
const posterQuote = document.getElementById('posterQuote');
const posterDay = document.getElementById('posterDay');

// Sample quotes for the motivational poster
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

// Upload System Demo
if (uploadAreas.length > 0 && fileInputs.length > 0) {
    // Keep track of uploaded files
    let uploadedFiles = [null, null, null];
    
    // Set up file upload for each area
    uploadAreas.forEach((area, index) => {
        const input = fileInputs[index];
        
        // Click on upload area to trigger file input
        area.addEventListener('click', () => {
            input.click();
        });
        
        // File selected
        input.addEventListener('change', () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                
                // Only accept images
                if (file.type.startsWith('image/')) {
                    // Create image preview
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        // Display image preview
                        area.innerHTML = `<img src="${e.target.result}" alt="Uploaded image" class="preview-image">`;
                        area.classList.add('uploaded');
                        
                        // Store the file
                        uploadedFiles[index] = file;
                        
                        // Check if all files are uploaded
                        checkAllUploaded();
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    alert('Please upload an image file (jpg, png, etc.)');
                }
            }
        });
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            area.addEventListener(eventName, () => {
                area.classList.add('highlight');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, () => {
                area.classList.remove('highlight');
            });
        });
        
        // Handle dropped files
        area.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            
            if (file && file.type.startsWith('image/')) {
                // Create image preview
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    // Display image preview
                    area.innerHTML = `<img src="${e.target.result}" alt="Uploaded image" class="preview-image">`;
                    area.classList.add('uploaded');
                    
                    // Store the file
                    uploadedFiles[index] = file;
                    
                    // Check if all files are uploaded
                    checkAllUploaded();
                };
                
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file (jpg, png, etc.)');
            }
        });
    });
    
    // Check if all 3 images are uploaded
    function checkAllUploaded() {
        if (uploadedFiles[0] && uploadedFiles[1] && uploadedFiles[2]) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    
    // Handle submit button click
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // Simulate loading
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
            submitButton.disabled = true;
            
            // Simulate verification process (70% success, 30% failure for demo)
            setTimeout(() => {
                const isSuccess = Math.random() < 0.7;
                
                if (isSuccess) {
                    // Show success message
                    successResult.style.display = 'flex';
                    failureResult.style.display = 'none';
                    
                    // Animate coin balance increase
                    let currentBalance = parseInt(coinBalance.textContent);
                    coinBalance.textContent = currentBalance + 5;
                    
                    // Show coin animation
                    coinAnimation.classList.add('active');
                    setTimeout(() => {
                        coinAnimation.classList.remove('active');
                    }, 2000);
                    
                    // Auto-generate a motivational poster
                    generatePoster();
                } else {
                    // Show failure message
                    successResult.style.display = 'none';
                    failureResult.style.display = 'flex';
                }
                
                // Reset button
                submitButton.innerHTML = 'Submit for Verification';
            }, 2000);
        });
    }
}

// Motivational Poster Generator
if (generateButton) {
    generateButton.addEventListener('click', generatePoster);
}

function generatePoster() {
    // Get random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    posterQuote.textContent = `"${randomQuote}"`;
    
    // Generate random day number (1-100 for demo)
    const randomDay = Math.floor(Math.random() * 100) + 1;
    posterDay.textContent = randomDay;
    
    // If we have an uploaded image for the post-task, use that
    // Otherwise use a placeholder
    if (uploadAreas && uploadAreas[2] && uploadAreas[2].classList.contains('uploaded')) {
        const previewImage = uploadAreas[2].querySelector('.preview-image');
        if (previewImage) {
            posterImage.src = previewImage.src;
        }
    }
    
    // Show animation
    const poster = document.getElementById('posterDisplay');
    if (poster) {
        poster.classList.add('generate');
        setTimeout(() => {
            poster.classList.remove('generate');
        }, 1000);
    }
}

// Earning Steps Animation
const earningSteps = document.querySelectorAll('.earning-step');
if (earningSteps.length > 0) {
    earningSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.5s ease';
    });
    
    const animateEarningSteps = () => {
        earningSteps.forEach((step, index) => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (stepPosition < screenPosition) {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    };
    
    window.addEventListener('scroll', animateEarningSteps);
    window.addEventListener('load', animateEarningSteps);
}

// Reward Cards Animation
const rewardCards = document.querySelectorAll('.reward-card');
if (rewardCards.length > 0) {
    rewardCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    const animateRewardCards = () => {
        rewardCards.forEach((card, index) => {
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
    
    window.addEventListener('scroll', animateRewardCards);
    window.addEventListener('load', animateRewardCards);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        coins: 0,
        streak: 0,
        achievements: []
    };

    // Update coin display
    const coinDisplay = document.querySelector('.coin-balance');
    if (coinDisplay) {
        coinDisplay.textContent = userData.coins;
    }

    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const daysRequired = parseInt(bar.dataset.days);
        const progress = Math.min((userData.streak / daysRequired) * 100, 100);
        bar.style.width = `${progress}%`;
    });

    // Handle premium subscription buttons
    const subscribeButtons = document.querySelectorAll('.subscribe-btn');
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.dataset.plan;
            const duration = this.dataset.duration;
            // Here you would typically integrate with a payment processor
            alert(`Redirecting to payment for ${duration} ${plan} plan...`);
        });
    });

    // Handle navigation buttons
    const homeButton = document.querySelector('.btn-home');
    const dashboardButton = document.querySelector('.btn-dashboard');
    const redeemButton = document.querySelector('.btn-redeem');

    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (dashboardButton) {
        dashboardButton.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }

    if (redeemButton) {
        redeemButton.addEventListener('click', () => {
            window.location.href = 'redeem.html';
        });
    }

    // Update achievement status
    const achievementItems = document.querySelectorAll('.roadmap-item');
    achievementItems.forEach(item => {
        const daysRequired = parseInt(item.dataset.days);
        const coinsRequired = parseInt(item.dataset.coins);
        const achievementId = item.dataset.id;

        // Check if achievement is earned
        const isEarned = userData.achievements.includes(achievementId);
        const canRedeem = userData.streak >= daysRequired && userData.coins >= coinsRequired;

        if (isEarned) {
            item.classList.add('earned');
            const status = item.querySelector('.achievement-status');
            if (status) {
                status.textContent = 'Earned';
                status.classList.add('earned');
            }
        } else if (canRedeem) {
            const status = item.querySelector('.achievement-status');
            if (status) {
                status.textContent = 'Available';
                status.classList.add('available');
            }
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to premium cards on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.pricing-option').forEach(card => {
        observer.observe(card);
    });
}); 