document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    const mainContent = document.getElementById('main-content');
    const homeContent = document.getElementById('home-content').innerHTML;
    const sidebar = document.getElementById('sidebar');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const menuIcon = sidebarCollapse.querySelector('i');

    // Sidebar toggle
    sidebarCollapse.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
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

            // Hide sidebar after clicking a link
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
});