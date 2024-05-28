document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');

    function openMenu() {
        console.log("Abrindo menu");
        menu.classList.add('open');
    }

    function closeMenu() {
        console.log("Fechando menu");
        menu.classList.remove('open');
    }

    // Adicionar evento de clique ao ícone do menu
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Fechar o menu ao clicar em um link dentro do menu
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
