document.addEventListener('DOMContentLoaded', () => {
    const newPlaylistFlag = sessionStorage.getItem('newPlaylist') === 'true';
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');

    if (newPlaylistFlag) {
        sessionStorage.setItem('newPlaylist', false);
    }

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
