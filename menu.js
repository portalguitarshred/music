// menu.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    // Verificar se os elementos de menu existem
    if (menuToggle && menu) {
        // Função para abrir o menu
        function openMenu() {
            menu.classList.add('open');
        }

        // Função para fechar o menu
        function closeMenu() {
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
    }

    // Específico para 'user-playlist.html'
    if (document.querySelector('body').classList.contains('user-playlist')) {
        // Adicionar funções específicas para a página 'user-playlist.html'
    }

    // Específico para 'user-my-playlist.html'
    if (document.querySelector('body').classList.contains('user-my-playlist')) {
        // Adicionar funções específicas para a página 'user-my-playlist.html'
    }

    // Específico para 'radio.html'
    if (document.querySelector('body').classList.contains('radio')) {
        // Adicionar funções específicas para a página 'radio.html'
    }
});
