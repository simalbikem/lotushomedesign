const btnOpenSidebar = document.querySelector("#btn-menu");
const sidebar = document.querySelector("#sidebar");
const btnCloseSidebar = document.querySelector("#close-sidebar");
const servicesMenu = document.querySelector(".megamenu-wrapper");

btnOpenSidebar.addEventListener("click", () => {
    sidebar.classList.add("active");
});

btnCloseSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !btnOpenSidebar.contains(event.target)) {
        sidebar.classList.remove("active");
    }
});

document.querySelectorAll(".megamenu-wrapper").forEach(menu => {
    menu.addEventListener("click", (e) => {
        if (window.innerWidth <= 991) {
        e.preventDefault();
        menu.classList.toggle("active");
        }
    });
});