document.addEventListener('DOMContentLoaded', () => {
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');

    // Iterar sobre os espaços e preencher com as capas das playlists
    playlists.forEach((playlist, index) => {
        const slotId = `playlist-slot-${index + 1}`;
        const playlistSlot = document.getElementById(slotId);
        
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = playlist.cover || 'capa-playlist.png';
            img.alt = playlist.name;

            // Adicionar evento de clique para abrir a playlist
            playlistSlot.onclick = () => {
                sessionStorage.setItem('currentPlaylistIndex', index);
                window.location.href = 'user-playlist.html';
            };
        }
    });

    // Preencher os slots vazios com a capa padrão
    for (let i = playlists.length; i < 6; i++) {
        const slotId = `playlist-slot-${i + 1}`;
        const playlistSlot = document.getElementById(slotId);
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = 'capa-playlist.png';
            img.alt = `Playlist ${i + 1}`;
            playlistSlot.onclick = null;
        }
    }
});
