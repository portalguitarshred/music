document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');
    const playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    playlists.forEach((playlist, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('playlist-grid-item');
        const coverImg = document.createElement('img');
        coverImg.src = playlist.cover || 'capa-playlist.png'; // Usar uma capa padrão se não houver uma capa personalizada
        coverImg.alt = `Playlist ${index + 1}`;
        gridItem.appendChild(coverImg);

        gridItem.addEventListener('click', () => {
            sessionStorage.setItem('currentPlaylistIndex', index);
            window.location.href = 'user-playlist.html';
        });

        playlistGridContainer.appendChild(gridItem);
    });

    // Adicione os elementos vazios restantes para preencher o grid de 6 espaços
    for (let i = playlists.length; i < 6; i++) {
        const emptyGridItem = document.createElement('div');
        emptyGridItem.classList.add('playlist-grid-item');
        const emptyCoverImg = document.createElement('img');
        emptyCoverImg.src = 'capa-playlist.png';
        emptyCoverImg.alt = `Espaço vazio ${i + 1}`;
        emptyGridItem.appendChild(emptyCoverImg);
        playlistGridContainer.appendChild(emptyGridItem);
    }
});
