document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistButton = document.getElementById('create-playlist-button');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const closeCreatePlaylistModal = document.getElementById('close-create-playlist-modal');
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');

    createPlaylistButton.addEventListener('click', () => {
        createPlaylistModal.style.display = 'block';
    });

    closeCreatePlaylistModal.addEventListener('click', () => {
        createPlaylistModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === createPlaylistModal) {
            createPlaylistModal.style.display = 'none';
        }
    });

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log("Capa da playlist URL:", coverUrl); // Log para verificar a URL
                localStorage.setItem('playlistCover', coverUrl);
                window.location.href = 'user-playlist.html';
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log("Nenhuma capa selecionada. Redirecionando sem capa.");
            localStorage.removeItem('playlistCover'); // Remover qualquer capa anterior
            window.location.href = 'user-playlist.html';
        }
    });

    // Carregar a capa da playlist na página user-playlist.html
    const playlistCoverImg = document.getElementById('playlist-cover');
    if (playlistCoverImg) {
        const coverUrl = localStorage.getItem('playlistCover');
        console.log("Capa da playlist carregada:", coverUrl); // Log para verificar o carregamento da URL
        if (coverUrl) {
            playlistCoverImg.src = coverUrl;
        } else {
            console.log("Nenhuma capa de playlist encontrada no localStorage.");
        }
    }
});
