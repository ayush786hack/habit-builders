document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Ayush Verma',
        email: 'ayush.verma@example.com',
        coins: 120,
        achievements: [],
        isPremium: false
    };

    // Update coin balance display
    document.getElementById('userCoins').textContent = `${currentUser.coins} coins`;

    // Premium subscription buttons
    document.getElementById('monthlyPremium').addEventListener('click', function() {
        if (confirm('Subscribe to monthly premium plan for ₹299?')) {
            currentUser.isPremium = true;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showSuccessMessage('Premium subscription activated!');
            updatePremiumStatus();
        }
    });

    document.getElementById('yearlyPremium').addEventListener('click', function() {
        if (confirm('Subscribe to yearly premium plan for ₹2,999?')) {
            currentUser.isPremium = true;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showSuccessMessage('Premium subscription activated!');
            updatePremiumStatus();
        }
    });

    // Update premium status
    function updatePremiumStatus() {
        const premiumElements = document.querySelectorAll('.premium-only');
        premiumElements.forEach(element => {
            element.style.display = currentUser.isPremium ? 'block' : 'none';
        });
    }

    // Update progress bars based on user's streak
    function updateProgressBars() {
        const currentStreak = getCurrentStreak(); // Implement this function based on your streak tracking
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach((bar, index) => {
            const milestones = [30, 90, 180, 365];
            const progress = Math.min((currentStreak / milestones[index]) * 100, 100);
            bar.style.width = `${progress}%`;
        });
    }

    // Achievement requirements
    const achievementRequirements = {
        certificate: {
            days: 30,
            coins: 750,
            image: 'certificate.png'
        },
        silver: {
            days: 90,
            coins: 2250,
            image: 'silver.png'
        },
        gold: {
            days: 180,
            coins: 4500,
            image: 'gold.png'
        },
        diamond: {
            days: 365,
            coins: 9000,
            image: 'diamond.png'
        }
    };

    // Check and update achievement status
    function updateAchievementStatus() {
        const currentStreak = getCurrentStreak(); // This should be implemented based on your streak tracking
        const redeemButtons = document.querySelectorAll('.redeem-btn');

        redeemButtons.forEach(button => {
            const achievement = button.dataset.achievement;
            const requirements = achievementRequirements[achievement];
            const hasEnoughCoins = currentUser.coins >= requirements.coins;
            const hasEnoughDays = currentStreak >= requirements.days;
            const isEarned = currentUser.achievements.includes(achievement);

            if (isEarned) {
                button.closest('.achievement-card').classList.add('earned');
                button.textContent = 'Earned';
                button.disabled = true;
            } else if (hasEnoughCoins && hasEnoughDays) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });
    }

    // Handle redeem button clicks
    document.querySelectorAll('.redeem-btn').forEach(button => {
        button.addEventListener('click', function() {
            const achievement = this.dataset.achievement;
            const requirements = achievementRequirements[achievement];

            if (currentUser.coins >= requirements.coins) {
                // Deduct coins
                currentUser.coins -= requirements.coins;
                currentUser.achievements.push(achievement);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Update UI
                document.getElementById('userCoins').textContent = `${currentUser.coins} coins`;
                this.closest('.achievement-card').classList.add('earned');
                this.textContent = 'Earned';
                this.disabled = true;

                // Add to achievements grid
                addToAchievementsGrid(achievement);

                // Show success message
                showSuccessMessage(`Congratulations! You've earned the ${achievement} achievement!`);
            }
        });
    });

    // Add achievement to the grid
    function addToAchievementsGrid(achievement) {
        const achievementsGrid = document.getElementById('userAchievements');
        const requirements = achievementRequirements[achievement];
        
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement-item';
        achievementElement.innerHTML = `
            <div class="achievement-icon">
                <img src="images/${requirements.image}" alt="${achievement}">
            </div>
            <h3>${achievement.charAt(0).toUpperCase() + achievement.slice(1)} Achievement</h3>
            <p>Earned on ${new Date().toLocaleDateString()}</p>
        `;
        
        achievementsGrid.appendChild(achievementElement);
    }

    // Show success message
    function showSuccessMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'success-message';
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    // Load existing achievements
    function loadExistingAchievements() {
        const achievementsGrid = document.getElementById('userAchievements');
        currentUser.achievements.forEach(achievement => {
            addToAchievementsGrid(achievement);
        });
    }

    // Initialize
    updateAchievementStatus();
    loadExistingAchievements();
    updatePremiumStatus();
    updateProgressBars();
}); 