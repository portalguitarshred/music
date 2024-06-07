document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistName = playlistNameInput.value.trim();
        const files = playlistFilesInput.files;

        console.log('Processando dados da playlist.');

        // Salvar o nome da playlist
        if (playlistName) {
            localStorage.setItem('playlistName', playlistName);
            console.log('Nome da playlist salvo:', playlistName);
        } else {
            console.log('Nenhum nome de playlist inserido.');
            localStorage.removeItem('playlistName');
        }

        // Salvar a capa da playlist
        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                localStorage.setItem('playlistCover', coverUrl);
                console.log('Capa da playlist salva:', coverUrl);
                saveSongs();  // Chama saveSongs após salvar a capa
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log('Nenhuma capa selecionada.');
            localStorage.removeItem('playlistCover');
            saveSongs();  // Chama saveSongs se não houver capa
        }

        // Função para salvar músicas
        function saveSongs() {
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
                        console.log('Música processada:', file.name);
                        if (filesProcessed === files.length) {
                            localStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                            localStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                            console.log('Todas as músicas foram salvas.');
                            window.location.href = 'user-playlist.html';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                console.log('Nenhuma música selecionada.');
                localStorage.removeItem('playlistSongs');
                localStorage.removeItem('playlistSongNames');
                window.location.href = 'user-playlist.html';
            }
        }
    });
});
