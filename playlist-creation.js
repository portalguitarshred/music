document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistTitleInput = document.getElementById('playlist-title-input'); // Campo para o título da playlist

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistTitle = playlistTitleInput.value; // Obter o título da playlist

        if (playlistTitle) {
            sessionStorage.setItem('playlistTitle', playlistTitle); // Salvar o título da playlist
            console.log("Título da playlist salvo:", playlistTitle); // Verificar se o título está sendo salvo
        } else {
            console.log("Nenhum título de playlist inserido.");
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log("Capa da playlist URL:", coverUrl); // Verificar a URL da capa
                sessionStorage.setItem('playlistCover', coverUrl); // Salvar a URL da capa
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
