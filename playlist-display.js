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
                const songDiv = document.createElement('div');
                songDiv.className = 'playlist-song';

                const songInfo = document.createElement('div');
                songInfo.className = 'playlist-song-info';

                const songTitle = document.createElement('h4');
                songTitle.textContent = songNames[index];

                songInfo.appendChild(songTitle);
                songDiv.appendChild(songInfo);
                playlistSongsContainer.appendChild(songDiv);
            });
        }
    }
});
