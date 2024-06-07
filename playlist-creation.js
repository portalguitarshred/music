document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name'); // Certifique-se de que este ID está correto
    const playlistFilesInput = document.getElementById('playlist-files'); // Campo para arquivos de música

    savePlaylistButton.addEventListener('click', () => {
        const playlistName = playlistNameInput.value;
        const playlistCoverFile = playlistCoverInput.files[0];
        const files = playlistFilesInput.files; // Pegando os arquivos de música

        if (playlistName) {
            console.log("Nome da playlist salvo:", playlistName);
            sessionStorage.setItem('playlistName', playlistName);
        } else {
            console.log("Nenhum nome de playlist inserido.");
            sessionStorage.removeItem('playlistName');
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log("Capa da playlist URL:", coverUrl);
                sessionStorage.setItem('playlistCover', coverUrl);
                savePlaylistSongs(files); // Salvar músicas depois de salvar a capa
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log("Nenhuma capa selecionada.");
            sessionStorage.removeItem('playlistCover');
            savePlaylistSongs(files); // Salvar músicas mesmo sem a capa
        }
    });

    function savePlaylistSongs(files) {
        const songURLs = [];
        const songNames = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function(event) {
                songURLs.push(event.target.result);
                songNames.push(file.name);
                if (songURLs.length === files.length) {
                    sessionStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                    sessionStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                    window.location.href = 'user-playlist.html';
                }
            };
            reader.readAsDataURL(file);
        }
    }
});
