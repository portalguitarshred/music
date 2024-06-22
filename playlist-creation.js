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

        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

        function savePlaylist(coverUrl) {
            const newPlaylist = {
                name: playlistName,
                cover: coverUrl,
                songs: songURLs,
                songNames: songNames
            };

            if (files.length > 0) {
                let filesProcessed = 0;
                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
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
                            newPlaylist.songs = songURLs;
                            newPlaylist.songNames = songNames;
                            playlists.push(newPlaylist);
                            localStorage.setItem('playlists', JSON.stringify(playlists));
                            updateMyPlaylistsDOM(newPlaylist, playlists.length);
                        }
                    };
                    reader.readAsArrayBuffer(file);
                });
            } else {
                playlists.push(newPlaylist);
                localStorage.setItem('playlists', JSON.stringify(playlists));
                updateMyPlaylistsDOM(newPlaylist, playlists.length);
            }
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                savePlaylist(coverUrl);
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            savePlaylist(null);
        }
    });

    function updateMyPlaylistsDOM(playlist, index) {
        const slotId = `playlist-slot-${index}`;
        const playlistSlot = document.getElementById(slotId);
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = playlist.cover || 'capa-playlist.png';
            img.alt = playlist.name;
        }
    }
});
