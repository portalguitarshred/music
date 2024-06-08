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
    const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs')) || [];
    const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames')) || [];

    if (playlistSongsContainer && songURLs.length) {
        songURLs.forEach((url, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'playlist-song';
            songItem.innerHTML = `
                <div class="playlist-song-info">
                    <h4>${songNames[index]}</h4>
                </div>
                <audio controls src="${url}" onerror="console.log('Erro ao carregar áudio:', this.src)"></audio>
            `;
            playlistSongsContainer.appendChild(songItem);

            // Usar Howler.js para fallback se necessário
            const sound = new Howl({
                src: [url],
                format: ['mp3', 'ogg', 'wav'],
                html5: true
            });

            songItem.querySelector('audio').addEventListener('play', () => {
                sound.play();
            });
        });
    }
});
