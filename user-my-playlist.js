// user-my-playlist.js
document.addEventListener('DOMContentLoaded', () => {
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');

    playlists.forEach((playlist, index) => {
        const slotId = `playlist-slot-${index + 1}`;
        const playlistSlot = document.getElementById(slotId);
        
        if (playlistSlot) {
            const img = playlistSlot.querySelector('img');
            img.src = playlist.cover || 'capa-playlist.png';
            img.alt = playlist.name;

            // Configurar clique para carregar a playlist
            playlistSlot.onclick = () => {
                sessionStorage.setItem('currentPlaylistIndex', index);
                sessionStorage.setItem('playlistCover', playlist.cover);
                sessionStorage.setItem('playlistName', playlist.name);
                sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
                sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
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
