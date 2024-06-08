document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');

    if (playlistCoverImg) {
        const coverUrl = sessionStorage.getItem('playlistCover');
        if (coverUrl) {
            playlistCoverImg.src = coverUrl;
        }
    }

    if (playlistTitleElem) {
        const playlistName = sessionStorage.getItem('playlistName');
        if (playlistName) {
            playlistTitleElem.textContent = playlistName;
        }
    }

    if (playlistSongsElem) {
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs') || '[]');
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames') || '[]');

        songURLs.forEach((url, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song';
            songItem.innerHTML = `
                <p>${songNames[index]}</p>
                <button class="play-button" data-url="${url}">Play</button>
            `;
            playlistSongsElem.appendChild(songItem);
        });

        // Adiciona evento de clique para os botões de play
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const url = event.target.getAttribute('data-url');
                const sound = new Howl({
                    src: [url],
                    format: ['mp3']
                });
                sound.play();
            });
        });
    }
});
