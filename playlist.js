document.addEventListener('DOMContentLoaded', () => {
    const playlistSongsContainer = document.getElementById('playlist-songs');

    // Função para adicionar uma música à lista de exibição
    function addSongToPlaylist(songName, songUrl) {
        const songElement = document.createElement('div');
        songElement.className = 'song';

        const songInfo = document.createElement('p');
        songInfo.textContent = songName;

        const playButton = document.createElement('button');
        playButton.textContent = 'Tocar';
        playButton.addEventListener('click', () => {
            const audio = new Audio(songUrl);
            audio.play();
        });

        songElement.appendChild(songInfo);
        songElement.appendChild(playButton);

        playlistSongsContainer.appendChild(songElement);
    }

    // Função para carregar músicas do sessionStorage
    function loadPlaylistSongs() {
        const songs = JSON.parse(sessionStorage.getItem('playlistSongs')) || [];
        const songNames = JSON.parse(sessionStorage.getItem('playlistSongNames')) || [];

        // Adicionar cada música à exibição
        songs.forEach((songUrl, index) => {
            addSongToPlaylist(songNames[index], songUrl);
        });
    }

    // Carregar músicas ao carregar a página
    loadPlaylistSongs();
});
