document.addEventListener('DOMContentLoaded', () => {
    const playlistSongsContainer = document.getElementById('playlist-songs');
    const playlistTitleElement = document.getElementById('playlist-title');

    // Função para adicionar uma música à lista de exibição
    function addSongToPlaylist(songName, songUrl) {
        const songElement = document.createElement('div');
        songElement.className = 'playlist-song';

        const songInfoContainer = document.createElement('div');
        songInfoContainer.className = 'playlist-song-info';

        const songInfo = document.createElement('h4');
        songInfo.textContent = songName;

        const playButton = document.createElement('button');
        playButton.textContent = 'Tocar';
        playButton.addEventListener('click', () => {
            const audio = new Audio(songUrl);
            audio.play();
        });

        songInfoContainer.appendChild(songInfo);
        songElement.appendChild(songInfoContainer);
        songElement.appendChild(playButton);

        playlistSongsContainer.appendChild(songElement);
    }

    // Função para carregar músicas do sessionStorage
    function loadPlaylistSongs() {
        const songURLs = JSON.parse(sessionStorage.getItem('playlistSongs')) || [];
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames')) || [];
        const playlistName = sessionStorage.getItem('playlistName');

        if (playlistName) {
            playlistTitleElement.textContent = playlistName;
        }

        // Adicionar cada música à exibição
        songURLs.forEach((songUrl, index) => {
            addSongToPlaylist(songNames[index], songUrl);
        });
    }

    // Carregar músicas ao carregar a página
    loadPlaylistSongs();
});
