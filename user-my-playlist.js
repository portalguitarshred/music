document.addEventListener('DOMContentLoaded', () => {
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');
    console.log('Playlists ao carregar:', playlists);

    playlists.forEach((playlist, index) => {
        const slotId = `playlist-slot-${index + 1}`;
        const playlistSlot = document.getElementById(slotId);
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = playlist.cover || 'capa-playlist.png';
            img.alt = playlist.name;

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
