document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir comportamento padrão

        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistName = playlistNameInput.value.trim();
        const files = playlistFilesInput.files;

        // Função para salvar o nome da playlist
        function savePlaylistName() {
            if (playlistName) {
                localStorage.setItem('playlistName', playlistName);
            } else {
                console.log("Nenhum nome de playlist inserido.");
                localStorage.removeItem('playlistName');
            }
        }

        // Função para salvar a capa da playlist
        function savePlaylistCover(callback) {
            if (playlistCoverFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const coverUrl = event.target.result;
                    console.log("Capa da playlist URL:", coverUrl);
                    localStorage.setItem('playlistCover', coverUrl);
                    callback();
                };
                reader.readAsDataURL(playlistCoverFile);
            } else {
                console.log("Nenhuma capa selecionada.");
                localStorage.removeItem('playlistCover');
                callback();
            }
        }

        // Função para salvar as músicas da playlist
        function savePlaylistSongs() {
            const songURLs = [];
            const songNames = [];

            if (files.length > 0) {
                let filesProcessed = 0;
                Array.from(files).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        songURLs.push(event.target.result);
                        songNames.push(file.name);
                        filesProcessed++;
                        if (filesProcessed === files.length) {
                            localStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                            localStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                            redirectToPlaylistPage();
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                console.log("Nenhuma música selecionada.");
                localStorage.removeItem('playlistSongs');
                localStorage.removeItem('playlistSongNames');
                redirectToPlaylistPage();
            }
        }

        // Função para redirecionar para a página da playlist
        function redirectToPlaylistPage() {
            window.location.href = 'user-playlist.html';
        }

        // Salvar nome, capa e músicas da playlist
        savePlaylistName();
        savePlaylistCover(savePlaylistSongs);
    });
});
