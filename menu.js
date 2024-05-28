document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');

    function toggleMenu() {
        menu.classList.toggle('open');
    }

    document.querySelector('.menu-toggle').addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !event.target.classList.contains('menu-toggle')) {
            menu.classList.remove('open');
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });
});
