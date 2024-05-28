document.addEventListener('DOMContentLoaded', () => {
    function toggleMenu() {
        console.log("Toggle menu");
        const menu = document.querySelector('.menu');
        menu.classList.toggle('open');
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
            menu.classList.remove('open');
        }
    });

    // Fechar o menu ao clicar em um link dentro do menu
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.menu').classList.remove('open');
        });
    });
});
