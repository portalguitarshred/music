document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsContainer = document.getElementById('playlist-songs');

    // Exibir a capa da playlist
    if (playlistCoverImg) {
        const coverUrl = localStorage.getItem('playlistCover');
        console.log('Carregando a capa da playlist:', coverUrl);
        if (coverUrl) {
            playlistCoverImg.src = coverUrl;
        } else {
            console.log('Nenhuma capa de playlist encontrada.');
        }
    }

    // Exibir o título da playlist
    if (playlistTitleElem) {
        const playlistName = localStorage.getItem('playlistName');
        console.log('Carregando o nome da playlist:', playlistName);
        if (playlistName) {
            playlistTitleElem.textContent = playlistName;
        } else {
            console.log('Nenhum nome de playlist encontrado.');
        }
    }

    // Exibir as músicas da playlist
    if (playlistSongsContainer) {
        const songURLs = JSON.parse(localStorage.getItem('playlistSongs')) || [];
        const songNames = JSON.parse(localStorage.getItem('playlistSongNames')) || [];

        if (songURLs.length > 0) {
            songURLs.forEach((url, index) => {
                const songDiv = document.createElement('div');
                songDiv.classList.add('playlist-song');
                
                const songInfo = document.createElement('div');
                songInfo.classList.add('playlist-song-info');
                songInfo.innerHTML = `<h4>${songNames[index]}</h4>`;
                
                const audioElement = document.createElement('audio');
                audioElement.controls = true;
                audioElement.src = url;

                songDiv.appendChild(songInfo);
                songDiv.appendChild(audioElement);
                playlistSongsContainer.appendChild(songDiv);
            });
        } else {
            console.log('Nenhuma música encontrada.');
        }
    }
});
