document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    function openMenu() {
        menu.classList.add('open');
    }

    function closeMenu() {
        menu.classList.remove('open');
    }

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const createPlaylistLink = document.getElementById('create-playlist-link');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const closeCreatePlaylistModal = document.getElementById('close-create-playlist-modal');

    createPlaylistLink.addEventListener('click', (e) => {
        e.preventDefault();
        createPlaylistModal.style.display = 'block';
    });

    closeCreatePlaylistModal.addEventListener('click', () => {
        createPlaylistModal.style.display = 'none';
    });

    const equalizerLink = document.getElementById('equalizer-link');
    const equalizerModal = document.getElementById('equalizerModal');
    const closeEqualizerModal = document.getElementById('closeEqualizerModal');

    equalizerLink.addEventListener('click', (e) => {
    e.preventDefault();
    equalizerModal.style.display = 'block';
});

closeEqualizerModal.addEventListener('click', () => {
    equalizerModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === equalizerModal) {
        equalizerModal.style.display = 'none';
    }
});

const myPlaylistsLink = document.getElementById('my-playlists-link');
myPlaylistsLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'user-my-playlist.html';
});

const shareLink = document.getElementById('share-link');
const shareModal = document.getElementById('shareModal');
const closeShareModal = document.getElementById('closeShareModal');
const copyLinkButton = document.getElementById('copyLink');
const shareFacebookButton = document.getElementById('shareFacebook');
const shareTwitterButton = document.getElementById('shareTwitter');

shareLink.addEventListener('click', (e) => {
    e.preventDefault();
    shareModal.style.display = 'block';
});

closeShareModal.addEventListener('click', () => {
    shareModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === shareModal) {
        shareModal.style.display = 'none';
    }
});

copyLinkButton.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copiado para a área de transferência.');
    }).catch(err => {
        console.error('Erro ao copiar o link: ', err);
    });
});

shareFacebookButton.addEventListener('click', () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(facebookUrl, '_blank');
});

shareTwitterButton.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterUrl, '_blank');
});
