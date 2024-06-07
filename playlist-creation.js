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

        console.log('Iniciando o processo de salvar a playlist');

        // Salvar o nome da playlist
        if (playlistName) {
            console.log('Nome da playlist salvo:', playlistName);
            sessionStorage.setItem('playlistName', playlistName);
        } else {
            console.log('Nenhum nome de playlist inserido.');
            sessionStorage.removeItem('playlistName');
        }

        // Salvar a capa da playlist
        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log('Capa da playlist URL:', coverUrl);
                sessionStorage.setItem('playlistCover', coverUrl);
                processSongs();
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log('Nenhuma capa selecionada.');
            sessionStorage.removeItem('playlistCover');
            processSongs(); // Chama processSongs diretamente se não houver capa
        }

        // Função para processar e salvar as músicas
        function processSongs() {
            console.log('Iniciando o processamento das músicas');
            if (files.length > 0) {
                let filesProcessed = 0;
                Array.from(files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        songURLs.push(event.target.result);
                        songNames.push(file.name);
                        filesProcessed++;
                        console.log('Música processada:', file.name);
                        if (filesProcessed === files.length) {
                            console.log('Todas as músicas foram processadas');
                            sessionStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                            sessionStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                            window.location.href = 'user-playlist.html';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                console.log('Nenhuma música selecionada.');
                sessionStorage.removeItem('playlistSongs');
                sessionStorage.removeItem('playlistSongNames');
                window.location.href = 'user-playlist.html';
            }
        }
    });
});
