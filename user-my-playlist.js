document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');

    // Carregar playlists do localStorage
    const playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    // Função para criar um elemento de capa de playlist
    function createPlaylistItem(playlist, index) {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-grid-item');
        playlistItem.dataset.index = index;

        const img = document.createElement('img');
        img.src = playlist.cover || 'capa-playlist.png'; // Use capa padrão se não houver uma capa salva
        img.alt = playlist.name;

        playlistItem.appendChild(img);

        // Adicionar evento de clique para abrir a playlist
        playlistItem.addEventListener('click', () => {
            sessionStorage.setItem('selectedPlaylist', index);
            window.location.href = 'user-playlist.html';
        });

        return playlistItem;
    }

    // Exibir até 6 playlists na grade
    playlists.slice(0, 6).forEach((playlist, index) => {
        const playlistItem = createPlaylistItem(playlist, index);
        playlistGridContainer.appendChild(playlistItem);
    });
});
