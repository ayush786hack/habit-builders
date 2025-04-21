document.addEventListener('DOMContentLoaded', function() {
    // Handle all navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle non-hash links
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                
                // Add a smooth transition effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after a short delay for the fade effect
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // Handle page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }, 100);
}); 