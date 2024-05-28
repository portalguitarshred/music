document.addEventListener('DOMContentLoaded', () => {
    function openMenu() {
        console.log("Abrindo menu");
        const menu = document.querySelector('.menu');
        menu.classList.remove('close');
        menu.classList.add('open');
    }

    function closeMenu() {
        console.log("Fechando menu");
        const menu = document.querySelector('.menu');
        menu.classList.remove('open');
        menu.classList.add('close');
    }

    function toggleMenu() {
        const menu = document.querySelector('.menu');
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Adicionar evento de clique ao ícone do menu
    document.querySelector('.menu-toggle').addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        const menu = document.querySelector('.menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Fechar o menu ao clicar em um link dentro do menu
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
