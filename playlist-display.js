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
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs'));
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames'));

        if (songURLs && songNames) {
            songURLs.forEach((url, index) => {
                const songName = songNames[index];
                const songElem = document.createElement('div');
                songElem.classList.add('playlist-song');

                songElem.innerHTML = `
                    <div class="playlist-song-info">
                        <h4>${songName}</h4>
                    </div>
                    <audio controls>
                        <source src="${url}" type="audio/mp3">
                        Your browser does not support the audio element.
                    </audio>
                `;

                playlistSongsContainer.appendChild(songElem);
            });
        }
    }
});
