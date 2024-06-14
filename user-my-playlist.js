// user-my-playlist.js

document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');

    const playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    // Limpar o container antes de adicionar novos elementos
    playlistGridContainer.innerHTML = '';

    playlists.forEach((playlist, index) => {
        // Cria um novo elemento para a playlist
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-grid-item');

        const img = document.createElement('img');
        img.src = playlist.cover || 'default-cover.png'; // Use capa padrão se não houver uma capa salva
        img.alt = playlist.name;

        playlistItem.appendChild(img);

        // Adicionar evento de clique para abrir a playlist
        playlistItem.addEventListener('click', () => {
            sessionStorage.setItem('playlistCover', playlist.cover);
            sessionStorage.setItem('playlistName', playlist.name);
            sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
            sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
            window.location.href = 'user-playlist.html';
        });

        playlistGridContainer.appendChild(playlistItem);
    });

    // Preencher os espaços restantes com itens vazios se necessário
    const totalPlaylists = playlists.length;
    const totalSpaces = 6;
    for (let i = totalPlaylists; i < totalSpaces; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.classList.add('playlist-grid-item');
        const emptyImg = document.createElement('img');
        emptyImg.src = 'default-cover.png'; // Use capa padrão para espaços vazios
        emptyImg.alt = `Espaço ${i + 1}`;
        emptyItem.appendChild(emptyImg);
        playlistGridContainer.appendChild(emptyItem);
    }
});
