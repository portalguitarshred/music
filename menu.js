// menu.js
document.addEventListener('DOMContentLoaded', () => {
    // Função para abrir ou fechar o menu
    function toggleMenu() {
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.classList.toggle('open');
        }
    }

    // Função para fechar o menu ao clicar fora dele
    function closeMenu(event) {
        const menu = document.querySelector('.menu');
        if (menu && !menu.contains(event.target) && !document.querySelector('.menu-toggle').contains(event.target)) {
            menu.classList.remove('open');
        }
    }

    // Adiciona evento de clique ao ícone do menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    // Fecha o menu ao clicar fora dele
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
