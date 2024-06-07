document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name-input');
    const playlistFilesInput = document.getElementById('playlist-files'); // Campo para arquivos de música

    savePlaylistButton.addEventListener('click', () => {
        const playlistName = playlistNameInput.value;
        if (playlistName) {
            sessionStorage.setItem('playlistName', playlistName);
        } else {
            sessionStorage.removeItem('playlistName');
        }

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

    function savePlaylistSongs() {
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
