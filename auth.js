// Auth tabs switching
const authTabs = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            authTabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab and corresponding panel
            tab.classList.add('active');
            const targetPanel = document.getElementById(tab.dataset.tab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Login form functionality
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate login - in a real application, this would make a fetch call to a backend
        console.log('Login attempt with:', { email });
        
        // Set login state
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
    });
}

// Register form functionality
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        // Simple validation
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        // Simulate registration - in a real application, this would make a fetch call to a backend
        console.log('Registration attempt with:', { name, email });
        
        // Set login state
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
    });
}

// Check if user is logged in
const checkAuth = () => {
    // In a real application, this would check for a token in localStorage or cookies
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Redirect to login if not logged in and on a protected page
    const protectedPages = ['dashboard.html', 'rewards.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'index.html';
    }
};

// Placeholder function to simulate login state for demo purposes
const simulateAuth = () => {
    // For demo purposes only
    const loginLinks = document.querySelectorAll('.btn-login');
    loginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('logged-in')) {
                // Simulate logout
                localStorage.setItem('isLoggedIn', 'false');
                link.textContent = 'Dashboard';
                link.classList.remove('logged-in');
            } else {
                // Simulate login
                localStorage.setItem('isLoggedIn', 'true');
            }
        });
    });
};

// Initialize auth functions
checkAuth();
simulateAuth(); 