document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistButton = document.getElementById('create-playlist-button');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const closeCreatePlaylistModal = document.getElementById('close-create-playlist-modal');

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
});
