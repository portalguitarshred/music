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

        // Salvar o nome da playlist
        if (playlistName) {
            sessionStorage.setItem('playlistName', playlistName);
        } else {
            console.log("Nenhum nome de playlist inserido.");
            sessionStorage.removeItem('playlistName');
        }

        // Salvar a capa da playlist
        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                sessionStorage.setItem('playlistCover', coverUrl);
                saveSongs();
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log("Nenhuma capa selecionada.");
            sessionStorage.removeItem('playlistCover');
            saveSongs(); // Chama saveSongs diretamente se não houver capa
        }

        // Função para salvar músicas
        function saveSongs() {
            if (files.length > 0) {
                let filesProcessed = 0; // Contador para verificar quando todos os arquivos foram processados
                Array.from(files).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        songURLs.push(event.target.result);
                        songNames.push(file.name);
                        filesProcessed++;
                        if (filesProcessed === files.length) {
                            // Apenas redireciona quando todos os arquivos foram processados
                            sessionStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                            sessionStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                            window.location.href = 'user-playlist.html';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                // Redireciona imediatamente se não houver arquivos selecionados
                console.log("Nenhuma música selecionada.");
                sessionStorage.removeItem('playlistSongs');
                sessionStorage.removeItem('playlistSongNames');
                window.location.href = 'user-playlist.html';
            }
        }
    });
});
