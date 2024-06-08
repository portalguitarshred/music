document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');

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

    // Exibir músicas da playlist
    if (playlistSongsElem) {
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs') || '[]');
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames') || '[]');

        songURLs.forEach((url, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song';
            songItem.innerHTML = `
                <p>${songNames[index]}</p>
                <audio controls src="${url}"></audio>
            `;
            playlistSongsElem.appendChild(songItem);
        });
    }
});
