document.addEventListener('DOMContentLoaded', () => {
    const playlistGridItems = document.querySelectorAll('.playlist-grid-item');

    playlistGridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Lógica para carregar a playlist correspondente
            const playlistId = index; // Use o índice ou outra identificação para a playlist
            console.log(`Playlist ${playlistId} clicada`);
            // Redirecionar ou carregar a playlist
            window.location.href = `playlist-detail.html?playlistId=${playlistId}`;
        });
    });
});
