// user-playlist.js

document.addEventListener('DOMContentLoaded', () => {
    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    let currentAudio = null;

    // Verifique se o índice da playlist está armazenado
    const currentPlaylistIndex = sessionStorage.getItem('currentPlaylistIndex');
    if (currentPlaylistIndex !== null) {
        const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');
        const playlist = playlists[parseInt(currentPlaylistIndex, 10)];

        if (playlist) {
            // Exibir a capa da playlist
            if (userPlaylistCoverImg) {
                userPlaylistCoverImg.src = playlist.cover || 'default-cover.jpg';
                userPlaylistCoverImg.alt = playlist.name;
            }

            // Exibir o título da playlist
            if (playlistTitleElem) {
                playlistTitleElem.textContent = playlist.name;
            }

            // Exibir as músicas da playlist
            if (playlistSongsElem) {
                playlistSongsElem.innerHTML = '';
                playlist.songNames.forEach((songName, index) => {
                    const songElem = document.createElement('div');
                    songElem.classList.add('playlist-song');

                    const songImg = document.createElement('img');
                    songImg.src = 'default-cover.png';
                    songElem.appendChild(songImg);

                    const songInfo = document.createElement('div');
                    songInfo.classList.add('playlist-song-info');

                    const songTitleText = songName.replace(/\.[^/.]+$/, '');
                    const songTitle = document.createElement('h4');
                    songTitle.textContent = songTitleText;
                    songInfo.appendChild(songTitle);

                    songElem.appendChild(songInfo);

                    // Adicione evento de clique para tocar a música
                    songElem.addEventListener('click', () => {
                        if (currentAudio) {
                            currentAudio.pause();
                            currentAudio.currentTime = 0;
                        }
                        currentAudio = new Audio(playlist.songs[index]);
                        currentAudio.play();
                    });

                    playlistSongsElem.appendChild(songElem);
                });
            }
        }
    } else {
        alert('Nenhuma playlist encontrada.');
    }
});
