document.addEventListener('DOMContentLoaded', () => {
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');
    console.log('Playlists ao carregar:', playlists);

    playlists.forEach((playlist, index) => {
        const slotId = `playlist-slot-${index + 1}`;
        const playlistSlot = document.getElementById(slotId);
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            console.log(`Atualizando slot ${slotId} com a capa:`, playlist.cover);
            img.src = playlist.cover || 'capa-playlist.png';
            img.alt = playlist.name;

            playlistSlot.onclick = () => {
                sessionStorage.setItem('currentPlaylistIndex', index);
                window.location.href = 'user-playlist.html';
            };
        } else {
            console.warn(`Slot ${slotId} não encontrado.`);
        }
    });

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
