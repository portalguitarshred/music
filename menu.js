// menu.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado.');

    function toggleMenu() {
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.classList.toggle('open');
            console.log('Menu toggled. Classe "open" aplicada:', menu.classList.contains('open'));
        } else {
            console.error('Elemento .menu não encontrado.');
        }
    }

    function closeMenu(event) {
        const menu = document.querySelector('.menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (menu && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('open');
            console.log('Menu fechado.');
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
            console.log('Menu toggle clicado.');
        });
    } else {
        console.error('Elemento .menu-toggle não encontrado.');
    }

    document.addEventListener('click', closeMenu);

    // Fecha o menu ao clicar em um link dentro dele
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.menu');
            if (menu) {
                menu.classList.remove('open');
                console.log('Menu fechado ao clicar em um link.');
            }
        });
    });

    console.log('menu.js carregado e executado.');
});
