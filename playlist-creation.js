document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistTitleInput = document.getElementById('playlist-title-input');

    savePlaylistButton.addEventListener('click', () => {
        const playlistCoverFile = playlistCoverInput.files[0];
        const playlistTitle = playlistTitleInput.value;

        if (playlistTitle) {
            sessionStorage.setItem('playlistTitle', playlistTitle);
        } else {
            console.log("Nenhum título de playlist inserido.");
        }

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log("Capa da playlist URL:", coverUrl);
                sessionStorage.setItem('playlistCover', coverUrl);
                window.location.href = 'user-playlist.html';
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            console.log("Nenhuma capa selecionada.");
            sessionStorage.removeItem('playlistCover');
            window.location.href = 'user-playlist.html';
        }
    });
});
