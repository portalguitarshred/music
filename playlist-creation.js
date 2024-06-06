document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistTitleInput = document.getElementById('playlist-title-input'); // Campo para o título da playlist

    savePlaylistButton.addEventListener('click', () => {
        const playlistTitle = playlistTitleInput.value; // Obter o título da playlist

        if (playlistTitle) {
            sessionStorage.setItem('playlistTitle', playlistTitle); // Salvar o título da playlist
            console.log("Título da playlist salvo:", playlistTitle); // Verificar se o título está sendo salvo
            window.location.href = 'user-playlist.html';
        } else {
            console.log("Nenhum título de playlist inserido.");
        }
    });
});
