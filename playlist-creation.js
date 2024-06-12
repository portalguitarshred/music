// playlist-creation.js

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

        if (!playlistName) {
            alert("Por favor, insira o nome da playlist.");
            return;
        }

        function savePlaylist(coverUrl) {
            const playlists = getPlaylists();
            const newPlaylist = {
                name: playlistName,
                cover: coverUrl,
                songs: songURLs,
                songNames: songNames,
            };

            playlists.push(newPlaylist);
            savePlaylists(playlists);
            window.location.href = 'user-my-playlist.html';
        }

        function saveSongs(coverUrl) {
            if (files.length > 0) {
                let filesProcessed = 0;
                Array.from(files).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        try {
                            const fileType = file.type || 'audio/mpeg';
                            if (fileType.includes('mp3') || fileType.includes('mpeg')) {
                                const blob = new Blob([event.target.result], { type: fileType });
                                const url = URL.createObjectURL(blob);
                                songURLs.push(url);
                            } else {
                                songURLs.push(event.target.result);
                            }
                            songNames.push(file.name);
                            filesProcessed++;
                            if (filesProcessed === files.length) {
                                savePlaylist(coverUrl);
                            }
                        } catch (error) {
                            console.error('Erro ao processar arquivo:', error);
                        }
                    };
                    reader.readAsArrayBuffer(file);
                });
            } else {
                savePlaylist(coverUrl);
            }
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const coverUrl = event.target.result;
                    saveSongs(coverUrl);
                } catch (error) {
                    console.error('Erro ao carregar a capa da playlist:', error);
                }
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            saveSongs(null);
        }
    });
});
