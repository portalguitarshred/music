document.addEventListener('DOMContentLoaded', () => {
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');

    // Iterar sobre os espaços e preencher com as capas das playlists
    for (let i = 0; i < 6; i++) {
        const slotId = `playlist-slot-${i + 1}`;
        const playlistSlot = document.getElementById(slotId);
        
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            const playlist = playlists[i];

            if (playlist) {
                img.src = playlist.cover || 'capa-playlist.png';
                img.alt = playlist.name;

                // Adicionar evento de clique para abrir a playlist
                playlistSlot.onclick = () => {
                    sessionStorage.setItem('currentPlaylistIndex', i);
                    window.location.href = 'user-playlist.html';
                };
            } else {
                img.src = 'capa-playlist.png';
                img.alt = `Playlist ${i + 1}`;
                playlistSlot.onclick = null;
            }
        }
    }
});
