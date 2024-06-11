document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistName = playlistNameInput.value.trim();
        const files = playlistFilesInput.files;
        const songURLs = [];
        const songNames = [];

        if (playlistName) {
            sessionStorage.setItem('playlistName', playlistName);
        } else {
            console.log("Nenhum nome de playlist inserido.");
            sessionStorage.removeItem('playlistName');
        }

        // Ler playlists existentes do localStorage
        let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

        // Gerar um novo ID único
        const newId = playlists.length > 0 ? Math.max(...playlists.map(p => p.id)) + 1 : 1;

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                saveSongs(coverUrl);
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            saveSongs('default-cover.jpg');
        }

        function saveSongs(coverUrl) {
            if (files.length > 0) {
                let filesProcessed = 0;
                Array.from(files).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const fileType = file.type || 'audio/mpeg';
                        const blob = new Blob([event.target.result], { type: fileType });
                        const url = URL.createObjectURL(blob);
                        songURLs.push(url);
                        songNames.push(file.name);
                        filesProcessed++;
                        if (filesProcessed === files.length) {
                            const newPlaylist = {
                                id: newId,
                                name: playlistName,
                                cover: coverUrl,
                                songs: songURLs,
                                songNames: songNames
                            };
                            playlists.push(newPlaylist);
                            localStorage.setItem('playlists', JSON.stringify(playlists));
                            sessionStorage.setItem('currentPlaylistId', newId);
                            window.location.href = 'user-my-playlist.html';
                        }
                    };
                    reader.readAsArrayBuffer(file);
                });
            } else {
                const newPlaylist = {
                    id: newId,
                    name: playlistName,
                    cover: coverUrl,
                    songs: [],
                    songNames: []
                };
                playlists.push(newPlaylist);
                localStorage.setItem('playlists', JSON.stringify(playlists));
                sessionStorage.setItem('currentPlaylistId', newId);
                window.location.href = 'user-my-playlist.html';
            }
        }
    });
});
