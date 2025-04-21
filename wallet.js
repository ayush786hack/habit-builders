document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data from localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Ankit',
        email: 'ankit@example.com',
        coins: 120
    };

    // Update wallet balance
    const balanceAmount = document.querySelector('.balance-amount');
    if (balanceAmount) {
        balanceAmount.textContent = `${userData.coins} coins`;
    }

    // Update sidebar user info
    const sidebarUserName = document.getElementById('sidebarUserName');
    const sidebarCoinCount = document.getElementById('sidebarCoinCount');
    
    if (sidebarUserName) {
        sidebarUserName.textContent = userData.name;
    }
    if (sidebarCoinCount) {
        sidebarCoinCount.textContent = userData.coins;
    }

    // Handle sidebar toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    
    if (toggleSidebar && sidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Handle transaction filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter transactions based on button data-filter attribute
            const filter = this.getAttribute('data-filter');
            filterTransactions(filter);
        });
    });
});

// Function to filter transactions
function filterTransactions(filter) {
    const transactions = document.querySelectorAll('.transaction-item');
    transactions.forEach(transaction => {
        const type = transaction.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
            transaction.style.display = 'flex';
        } else {
            transaction.style.display = 'none';
        }
    });
} 