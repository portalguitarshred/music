document.addEventListener('DOMContentLoaded', () => {
    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    let currentAudio = null; // Variável para controlar a reprodução da música

    // Ler o ID da playlist atual do sessionStorage
    const currentPlaylistId = parseInt(sessionStorage.getItem('currentPlaylistId'));
    const playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    const currentPlaylist = playlists.find(p => p.id === currentPlaylistId);

    if (currentPlaylist) {
        // Exibir a capa da playlist
        userPlaylistCoverImg.src = currentPlaylist.cover;

        // Exibir o título da playlist
        playlistTitleElem.textContent = currentPlaylist.name;

        // Exibir as músicas da playlist
        currentPlaylist.songs.forEach((songUrl, index) => {
            const songElem = document.createElement('div');
            songElem.classList.add('playlist-song');

            const songImg = document.createElement('img');
            songImg.src = 'default-cover.png';
            songElem.appendChild(songImg);

            const songInfo = document.createElement('div');
            songInfo.classList.add('playlist-song-info');

            const songTitle = document.createElement('h4');
            songTitle.textContent = currentPlaylist.songNames[index].replace(/\.[^/.]+$/, '');
            songInfo.appendChild(songTitle);

            songElem.appendChild(songInfo);

            // Adicione evento de clique para tocar a música
            songElem.addEventListener('click', () => {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }
                currentAudio = new Audio(songUrl);
                currentAudio.play();
            });

            playlistSongsElem.appendChild(songElem);
        });
    }
});
