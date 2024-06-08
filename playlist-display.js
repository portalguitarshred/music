document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsContainer = document.getElementById('playlist-songs');

    // Exibir a capa da playlist
    if (playlistCoverImg) {
        const coverUrl = sessionStorage.getItem('playlistCover');
        if (coverUrl) {
            playlistCoverImg.src = coverUrl;
        }
    }

    // Exibir o título da playlist
    if (playlistTitleElem) {
        const playlistName = sessionStorage.getItem('playlistName');
        if (playlistName) {
            playlistTitleElem.textContent = playlistName;
        }
    }

    // Exibir as músicas da playlist
    if (playlistSongsContainer) {
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs')) || [];
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames')) || [];

        if (songURLs.length > 0) {
            songURLs.forEach((url, index) => {
                const songItem = document.createElement('div');
                songItem.className = 'playlist-song';
                songItem.innerHTML = `
                    <div class="playlist-song-info">
                        <h4>${songNames[index]}</h4>
                    </div>
                    <audio class="playlist-audio-player" controls>
                        <source src="${url}" type="audio/mpeg">
                        <source src="${url}" type="audio/ogg">
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                `;
                playlistSongsContainer.appendChild(songItem);
            });

            const players = Plyr.setup('.playlist-audio-player', {
                controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume']
            });
        }
    }
});
