// menu.js
document.addEventListener('DOMContentLoaded', () => {
    function toggleMenu() {
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.classList.toggle('open');
        }
    }

    function closeMenu(event) {
        const menu = document.querySelector('.menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (menu && !menu.contains(event.target) && menuToggle && !menuToggle.contains(event.target)) {
            menu.classList.remove('open');
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    document.addEventListener('click', closeMenu);

    // Fecha o menu ao clicar em um link dentro dele
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.menu');
            if (menu) {
                menu.classList.remove('open');
            }
        });
    });
});
