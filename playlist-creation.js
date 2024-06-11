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

        function resizeImage(file, maxSize, callback) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const scaleSize = maxSize / Math.max(img.width, img.height);
                    canvas.width = img.width * scaleSize;
                    canvas.height = img.height * scaleSize;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    callback(canvas.toDataURL('image/jpeg'));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        function saveSongs() {
            if (files.length > 0) {
                let filesProcessed = 0;
                Array.from(files).forEach((file, index) => {
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
                            savePlaylist(songURLs, songNames);
                        }
                    };
                    reader.readAsArrayBuffer(file);
                });
            } else {
                savePlaylist(songURLs, songNames);
            }
        }

        function savePlaylist(songURLs, songNames) {
            const playlists = JSON.parse(localStorage.getItem('playlists')) || [];
            const newPlaylist = {
                name: playlistName,
                cover: '',
                songs: songURLs,
                songNames: songNames
            };

            if (playlistCoverFile) {
                resizeImage(playlistCoverFile, 800, (resizedCover) => {
                    newPlaylist.cover = resizedCover;
                    playlists.push(newPlaylist);
                    localStorage.setItem('playlists', JSON.stringify(playlists));
                    window.location.href = 'user-my-playlist.html';
                });
            } else {
                playlists.push(newPlaylist);
                localStorage.setItem('playlists', JSON.stringify(playlists));
                window.location.href = 'user-my-playlist.html';
            }
        }

        saveSongs();
    });
});
