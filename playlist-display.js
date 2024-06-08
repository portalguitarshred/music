document.addEventListener('DOMContentLoaded', () => {
    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');

    // Exibir a capa da playlist escolhida pelo usuário
    if (userPlaylistCoverImg) {
        const userCoverUrl = sessionStorage.getItem('playlistCover');
        if (userCoverUrl) {
            userPlaylistCoverImg.src = userCoverUrl;
        }
    }

    // Exibir a capa da playlist dentro do player
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
    if (playlistSongsElem) {
        const playlistSongs = JSON.parse(sessionStorage.getItem('playlistSongs') || '[]');
        const playlistSongNames = JSON.parse(sessionStorage.getItem('playlistSongNames') || '[]');

        playlistSongs.forEach((songUrl, index) => {
            const songElem = document.createElement('div');
            songElem.classList.add('playlist-song');

            const songImg = document.createElement('img');
            songImg.src = 'default-cover.png'; // Utilize uma imagem padrão ou mapeie para uma capa correta
            songElem.appendChild(songImg);

            const songInfo = document.createElement('div');
            songInfo.classList.add('playlist-song-info');
            
            const songTitle = document.createElement('h4');
            songTitle.textContent = playlistSongNames[index];
            songInfo.appendChild(songTitle);

            songElem.appendChild(songInfo);

            // Adicione evento de clique para tocar a música
            songElem.addEventListener('click', () => {
                const audio = new Audio(songUrl);
                audio.play();
            });

            playlistSongsElem.appendChild(songElem);
        });
    }
});
