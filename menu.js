document.addEventListener('DOMContentLoaded', () => {
    function openMenu() {
        document.querySelector('.menu').classList.add('open');
    }

    function closeMenu() {
        document.querySelector('.menu').classList.remove('open');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const menu = document.querySelector('.menu');
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', (event) => {
        const menu = document.querySelector('.menu');
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
