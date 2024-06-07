document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name-input'); // Novo campo para o nome da playlist

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistName = playlistNameInput.value; // Obtendo o valor do nome da playlist
        
        if (playlistName) {
            console.log("Nome da playlist salvo:", playlistName); // Verificar se o nome está sendo salvo
            sessionStorage.setItem('playlistName', playlistName); // Salvar o nome da playlist
        } else {
            console.log("Nenhum nome de playlist inserido.");
            sessionStorage.removeItem('playlistName'); // Remover qualquer nome anterior
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log("Capa da playlist URL:", coverUrl);
                sessionStorage.setItem('playlistCover', coverUrl); // Usar sessionStorage para garantir que o dado não se perca
                window.location.href = 'user-playlist.html';
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log("Nenhuma capa selecionada.");
            sessionStorage.removeItem('playlistCover'); // Remover qualquer capa anterior
            window.location.href = 'user-playlist.html';
        }
    });
});
