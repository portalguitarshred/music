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
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Funções para os novos itens do menu
    const createPlaylistLink = document.getElementById('create-playlist-link');
    const equalizerLink = document.getElementById('equalizer-link');
    const myPlaylistsLink = document.getElementById('my-playlists-link');
    const shareLink = document.getElementById('share-link');

    createPlaylistLink.addEventListener('click', () => {
        document.getElementById('create-playlist-modal').style.display = 'block';
    });

    equalizerLink.addEventListener('click', () => {
        document.getElementById('equalizerModal').style.display = 'block';
    });

    myPlaylistsLink.addEventListener('click', () => {
        // Redirecionar ou abrir modal de playlists
        window.location.href = 'my-playlists.html'; // Supondo que há uma página para listas de reprodução
    });

    shareLink.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Guitar Shred',
                text: 'Confira essa incrível playlist que estou ouvindo!',
                url: window.location.href
            }).then(() => {
                console.log('Compartilhamento bem-sucedido');
            }).catch((error) => {
                console.error('Erro ao compartilhar', error);
            });
        } else {
            alert('O compartilhamento não é suportado no seu navegador.');
        }
    });
});
