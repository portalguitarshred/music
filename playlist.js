document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistButton = document.getElementById('create-playlist-button');
    const createPlaylistModal = document.getElementById('create-playlist-modal');
    const closeCreatePlaylistModal = document.getElementById('close-create-playlist-modal');
    const savePlaylistButton = document.getElementById('save-playlist-button');

    // Função para abrir o modal de criação de playlist
    function openCreatePlaylistModal() {
        createPlaylistModal.style.display = 'block';
    }

    // Função para fechar o modal de criação de playlist
    function closeCreatePlaylistModalFunc() {
        createPlaylistModal.style.display = 'none';
    }

    // Event listener para abrir o modal ao clicar no botão de criação de playlist
    createPlaylistButton.addEventListener('click', openCreatePlaylistModal);

    // Event listener para fechar o modal ao clicar no botão de fechar
    closeCreatePlaylistModal.addEventListener('click', closeCreatePlaylistModalFunc);

    // Event listener para fechar o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === createPlaylistModal) {
            closeCreatePlaylistModalFunc();
        }
    });

    // Função para salvar a playlist e redirecionar para a página de playlist
    savePlaylistButton.addEventListener('click', () => {
        const playlistNameInput = document.getElementById('playlist-name');
        const playlistCoverInput = document.getElementById('playlist-cover-input');
        const playlistFilesInput = document.getElementById('playlist-files');
        
        const playlistName = playlistNameInput.value;
        sessionStorage.setItem('playlistName', playlistName);

        // Salvar capa da playlist
        const playlistCoverFile = playlistCoverInput.files[0];
        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                sessionStorage.setItem('playlistCover', coverUrl);
                savePlaylistSongs();
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            sessionStorage.removeItem('playlistCover');
            savePlaylistSongs();
        }
    });

    // Função para salvar as músicas da playlist
    function savePlaylistSongs() {
        const playlistFilesInput = document.getElementById('playlist-files');
        const files = playlistFilesInput.files;
        const songURLs = [];
        const songNames = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function(event) {
                songURLs.push(event.target.result);
                songNames.push(file.name);
                if (songURLs.length === files.length) {
                    sessionStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                    sessionStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                    window.location.href = 'user-playlist.html';
                }
            };
            reader.readAsDataURL(file);
        }
    }
});
