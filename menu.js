document.addEventListener('DOMContentLoaded', () => {
    const menuToggleCheckbox = document.getElementById('menu-toggle-checkbox');
    
    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        const menu = document.querySelector('.menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggleCheckbox.checked = false;
        }
    });

    // Fechar o menu ao clicar em um link dentro do menu
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggleCheckbox.checked = false;
        });
    });
});
