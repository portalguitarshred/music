document.addEventListener('DOMContentLoaded', () => {
    // Função para abrir o menu
    function openMenu() {
        document.querySelector('.menu').classList.add('open');
    }

    // Função para fechar o menu
    function closeMenu() {
        document.querySelector('.menu').classList.remove('open');
    }

    // Adicionar evento de clique ao ícone do menu
    document.querySelector('.menu-toggle').addEventListener('click', (event) => {
        event.stopPropagation();
        openMenu();
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
