// my-playlist.js

document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');

    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    playlists.forEach((playlist, index) => {
        // Selecionar o item da grade correspondente pelo índice
        const gridItem = document.querySelector(`.playlist-grid-item:nth-child(${index + 1})`);

        if (gridItem) {
            const img = document.createElement('img');
            img.src = playlist.cover || 'default-cover.png'; // Use a imagem da capa ou uma imagem padrão
            img.alt = `Playlist ${index + 1}`;
            gridItem.innerHTML = ''; // Limpa qualquer conteúdo anterior
            gridItem.appendChild(img);
            
            gridItem.addEventListener('click', () => {
                sessionStorage.setItem('playlistCover', playlist.cover);
                sessionStorage.setItem('playlistName', playlist.name);
                sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
                sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
                window.location.href = 'user-playlist.html';
            });
        }
    });
});
