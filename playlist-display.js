document.addEventListener('DOMContentLoaded', () => {
    const playlistSongsContainer = document.getElementById('playlist-songs');
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
                <button class="play-song-button" data-url="${url}">Play</button>
            `;
            playlistSongsContainer.appendChild(songItem);
        });

        document.querySelectorAll('.play-song-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const url = event.target.getAttribute('data-url');
                const sound = new Howl({
                    src: [url],
                    format: ['mp3', 'ogg', 'wav']
                });
                sound.play();
            });
        });
    }
});
