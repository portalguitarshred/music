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
