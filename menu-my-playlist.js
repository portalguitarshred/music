// menu-my-playlist.js
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');

    function toggleMenu() {
        if (menu) {
            menu.classList.toggle('open');
        }
    }

    function closeMenu(event) {
        if (menu && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('open');
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    document.addEventListener('click', closeMenu);

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu) {
                menu.classList.remove('open');
            }
        });
    });
});
