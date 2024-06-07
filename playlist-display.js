document.addEventListener('DOMContentLoaded', () => {
    const playlistSongsContainer = document.getElementById('playlist-songs');

    // Exibir as músicas da playlist
    if (playlistSongsContainer) {
        const songURLs = JSON.parse(localStorage.getItem('playlistSongs')) || [];
        const songNames = JSON.parse(localStorage.getItem('playlistSongNames')) || [];

        playlistSongsContainer.innerHTML = '';

        songURLs.forEach((url, index) => {
            const songElem = document.createElement('div');
            songElem.classList.add('playlist-song');
            songElem.innerHTML = `
                <div class="song-details">
                    <audio controls>
                        <source src="${url}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <div class="playlist-song-info">
                        <h4>${songNames[index]}</h4>
                    </div>
                </div>
            `;
            playlistSongsContainer.appendChild(songElem);
        });
    }
});
