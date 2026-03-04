document.addEventListener("DOMContentLoaded", () => {
    const btnMenu    = document.getElementById("btn-menu");
    const sidebar    = document.getElementById("sidebar");
    const closeBtn   = document.getElementById("close-sidebar");

    if (!btnMenu || !sidebar || !closeBtn) {
        console.warn("Sidebar elemanlarından biri eksik.");
        return;
    }

    btnMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.add("active");
        document.body.classList.add("sidebar-open");
    });

    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.remove("active");
        document.body.classList.remove("sidebar-open");
    });

    document.addEventListener("click", (e) => {
        if (!document.body.classList.contains("sidebar-open")) return;

        const clickInside = sidebar.contains(e.target);
        const clickHamburger = btnMenu === e.target || btnMenu.contains(e.target);

        if (!clickInside && !clickHamburger) {
        sidebar.classList.remove("active");
        document.body.classList.remove("sidebar-open");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.body.classList.contains("sidebar-open")) {
        sidebar.classList.remove("active");
        document.body.classList.remove("sidebar-open");
        }
    });

    sidebar.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.remove("active");
            document.body.classList.remove("sidebar-open");
        }
        });
    });
});