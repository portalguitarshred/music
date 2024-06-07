document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title'); // Novo elemento para o título
    const playlistSongsContainer = document.getElementById('playlist-songs'); // Container para as músicas

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
    if (playlistSongsContainer) {
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs') || '[]');
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames') || '[]');

        playlistSongsContainer.innerHTML = ''; // Limpar o container antes de adicionar as músicas

        songNames.forEach((songName, index) => {
            const songUrl = songURLs[index];
            const songElement = document.createElement('div');
            songElement.className = 'song';
            songElement.innerHTML = `
                <audio controls>
                    <source src="${songUrl}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
                <p>${songName}</p>
            `;
            playlistSongsContainer.appendChild(songElement);
        });
    }
});
