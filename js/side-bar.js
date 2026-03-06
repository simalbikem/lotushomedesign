document.addEventListener('DOMContentLoaded', () => {
    const btnOpen       = document.getElementById('btn-menu');
    const btnClose      = document.getElementById('close-sidebar');
    const sidebar       = document.getElementById('sidebar');
    const body          = document.body;

    if (!btnOpen || !sidebar) {
        console.warn("Sidebar veya açma butonu bulunamadı.");
        return;
    }

    function openSidebar() {
        sidebar.classList.add('active');
        body.classList.add('menu-open');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        body.classList.remove('menu-open');

        document.querySelectorAll('.menu-list-item.active').forEach(item => {
        item.classList.remove('active');
        });
    }

    btnOpen.addEventListener('click', openSidebar);
    btnClose.addEventListener('click', closeSidebar);

    document.addEventListener('click', (e) => {
        if (
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !btnOpen.contains(e.target)
        ) {
        closeSidebar();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
        }
    });

    if (window.innerWidth <= 991) {
        document.querySelectorAll('.megamenu-wrapper > .menu-link').forEach(mainLink => {
        mainLink.addEventListener('click', function (e) {
            if (window.innerWidth > 991) return;

            e.preventDefault();          
            e.stopPropagation();         

            const parentItem = this.closest('.menu-list-item');

            document.querySelectorAll('.menu-list-item.active').forEach(item => {
            if (item !== parentItem) item.classList.remove('active');
            });

            parentItem.classList.toggle('active');
        });
        });

        document.querySelectorAll('#sidebar .dropdown-item').forEach(link => {
        link.addEventListener('click', closeSidebar);
        });

        document.querySelectorAll('#sidebar .menu-link:not(.megamenu-wrapper > .menu-link)').forEach(link => {
        link.addEventListener('click', closeSidebar);
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && sidebar.classList.contains('active')) {
        closeSidebar();
        }
    });
});