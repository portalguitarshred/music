document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');

    // Ler playlists do localStorage
    const playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    // Limpar o container
    playlistGridContainer.innerHTML = '';

    // Adicionar cada playlist ao grid
    playlists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-grid-item');
        playlistItem.innerHTML = `
            <img src="${playlist.cover}" alt="${playlist.name}">
        `;
        playlistItem.addEventListener('click', () => {
            // Salvar o ID da playlist no sessionStorage e redirecionar para user-playlist.html
            sessionStorage.setItem('currentPlaylistId', playlist.id);
            window.location.href = 'user-playlist.html';
        });
        playlistGridContainer.appendChild(playlistItem);
    });
});
