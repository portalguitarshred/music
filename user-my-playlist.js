document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');

    // Limpar o container antes de adicionar novos elementos
    playlistGridContainer.innerHTML = '';

    // Adicionar as playlists salvas
    playlists.forEach((playlist, index) => {
        const slotId = `playlist-slot-${index + 1}`;
        const playlistSlot = document.getElementById(slotId);
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = playlist.cover || 'capa-playlist.png';
            img.alt = playlist.name;

            // Adicionar evento de clique para abrir a playlist
            playlistSlot.addEventListener('click', () => {
                sessionStorage.setItem('currentPlaylistIndex', index);
                window.location.href = 'user-playlist.html';
            });
        }
    });

    // Preencher os slots vazios com a capa padrão
    for (let i = playlists.length + 1; i <= 6; i++) {
        const slotId = `playlist-slot-${i}`;
        const playlistSlot = document.getElementById(slotId);
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = 'capa-playlist.png';
            img.alt = `Playlist ${i}`;
        }
    }
});
