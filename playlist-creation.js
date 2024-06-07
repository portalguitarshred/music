document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name-input');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistName = playlistNameInput.value;
        const files = playlistFilesInput.files;
        const songURLs = [];
        const songNames = [];

        if (playlistName) {
            sessionStorage.setItem('playlistName', playlistName);
        } else {
            sessionStorage.removeItem('playlistName');
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                sessionStorage.setItem('playlistCover', coverUrl);
                saveSongs();
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            sessionStorage.removeItem('playlistCover');
            saveSongs();
        }

        function saveSongs() {
            if (files.length > 0) {
                Array.from(files).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        songURLs.push(event.target.result);
                        songNames.push(file.name);
                        if (index === files.length - 1) {
                            sessionStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                            sessionStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                            window.location.href = 'user-playlist.html';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                sessionStorage.removeItem('playlistSongs');
                sessionStorage.removeItem('playlistSongNames');
                window.location.href = 'user-playlist.html';
            }
        }
    });
});
