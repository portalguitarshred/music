document.addEventListener('DOMContentLoaded', () => {
    // Código para o menu
    function openMenu() {
        document.querySelector('.menu').classList.add('open');
    }

    function closeMenu() {
        document.querySelector('.menu').classList.remove('open');
    }

    document.querySelector('.menu-toggle').addEventListener('click', (event) => {
        event.stopPropagation();
        openMenu();
    });

    document.addEventListener('click', (event) => {
        const menu = document.querySelector('.menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
