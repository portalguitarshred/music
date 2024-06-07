document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
        const playlistName = playlistNameInput.value.trim();
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistFiles = playlistFilesInput.files;

        console.log("Tentativa de salvar a playlist:");
        console.log("Nome da playlist:", playlistName);
        console.log("Arquivo da capa:", playlistCoverFile);
        console.log("Arquivos de música:", playlistFiles);

        // Verificar se o nome da playlist foi inserido
        if (!playlistName) {
            alert("Por favor, insira um nome para a playlist.");
            return;
        }

        // Salvar o nome da playlist
        sessionStorage.setItem('playlistName', playlistName);

        // Salvar a capa da playlist, se houver
        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                sessionStorage.setItem('playlistCover', coverUrl);
                savePlaylistSongs(); // Salvar as músicas depois da capa
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            sessionStorage.removeItem('playlistCover'); // Remover capa anterior
            savePlaylistSongs(); // Salvar as músicas diretamente
        }
    });

    function savePlaylistSongs() {
        const files = playlistFilesInput.files;
        const songURLs = [];
        const songNames = [];

        // Verificar se há arquivos de música selecionados
        if (files.length === 0) {
            alert("Nenhum arquivo de música selecionado.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function(event) {
                songURLs.push(event.target.result);
                songNames.push(file.name);
                if (songURLs.length === files.length) {
                    sessionStorage.setItem('playlistSongs', JSON.stringify(songURLs));
                    sessionStorage.setItem('playlistSongNames', JSON.stringify(songNames));
                    console.log("Músicas da playlist salvas:", songNames);
                    window.location.href = 'user-playlist.html';
                }
            };
            reader.readAsDataURL(file);
        }
    }
});
