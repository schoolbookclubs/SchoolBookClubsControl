document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    const mainContent = document.getElementById('main-content');
    const homeContent = document.getElementById('home-content').innerHTML;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse');

    // Toggle sidebar on button click
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });

    // Close sidebar by default on mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.add('active');
        content.classList.add('active');
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('active');
            content.classList.add('active');
        } else {
            sidebar.classList.remove('active');
            content.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Get the page id from href
            const pageId = this.getAttribute('href').substring(1);
            
            // If home page, show home content, otherwise show placeholder
            if (pageId === 'home') {
                mainContent.innerHTML = homeContent;
            } else {
                mainContent.innerHTML = `<h2>${this.textContent.trim()}</h2>
                <p>محتوى صفحة ${this.textContent.trim()}</p>`;
            }

            // Close sidebar on mobile after clicking a link
            if (window.innerWidth <= 768) {
                sidebar.classList.add('active');
                content.classList.add('active');
            }
        });
    });
});