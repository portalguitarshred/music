document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir comportamento padrão

        const files = playlistFilesInput.files;
        const songURLs = [];
        const songNames = [];

        // Função para salvar músicas da playlist
        function savePlaylistSongs() {
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
                            window.location.href = 'user-playlist.html';
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                console.log("Nenhuma música selecionada.");
                localStorage.removeItem('playlistSongs');
                localStorage.removeItem('playlistSongNames');
                window.location.href = 'user-playlist.html';
            }
        }

        // Chamar a função para salvar músicas
        savePlaylistSongs();
    });
});
