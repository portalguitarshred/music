document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistTitleInput = document.getElementById('playlist-title-input'); // Novo campo de título

    savePlaylistButton.addEventListener('click', () => {
        const playlistTitle = playlistTitleInput.value; // Obter o título da playlist
        const playlistCoverFile = playlistCoverInput.files[0];

        // Salvar o título da playlist no sessionStorage
        sessionStorage.setItem('playlistTitle', playlistTitle);

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
