document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data from localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Ankit',
        email: 'ankit@example.com',
        coins: 120
    };

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

    // Handle navigation links - simplified approach
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                window.location.replace(href);
            }
        });
    });
}); 