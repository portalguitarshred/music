document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
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
        const files = playlistFilesInput.files;
        const songURLs = [];
        const songNames = [];

        if (files.length === 0) {
            sessionStorage.removeItem('playlistSongs');
            sessionStorage.removeItem('playlistSongNames');
            window.location.href = 'user-playlist.html';
            return;
        }

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
