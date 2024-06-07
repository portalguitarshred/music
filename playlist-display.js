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
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs') || '[]');
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames') || '[]');

        songURLs.forEach((url, index) => {
            const songElement = document.createElement('div');
            songElement.classList.add('playlist-song');
            
            const songAudio = document.createElement('audio');
            songAudio.src = url;
            songAudio.controls = true;

            const songInfo = document.createElement('div');
            songInfo.classList.add('playlist-song-info');

            const songName = document.createElement('h4');
            songName.textContent = songNames[index];

            songInfo.appendChild(songName);
            songElement.appendChild(songInfo);
            songElement.appendChild(songAudio);

            playlistSongsContainer.appendChild(songElement);
        });
    }
});
