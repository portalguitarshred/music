document.addEventListener('DOMContentLoaded', () => {
    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    const likeButton = document.getElementById('like-button');
    const likeCountElem = document.getElementById('like-count');
    let currentAudio = null; // Variável para controlar a reprodução da música

    const selectedPlaylistIndex = parseInt(sessionStorage.getItem('selectedPlaylist'));
    const playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    const playlist = playlists[selectedPlaylistIndex];

    if (playlist) {
        // Exibir a capa da playlist escolhida pelo usuário
        if (userPlaylistCoverImg && playlist.cover) {
            userPlaylistCoverImg.src = playlist.cover;
        }

        // Exibir o título da playlist
        if (playlistTitleElem) {
            playlistTitleElem.textContent = playlist.name;
        }

        // Exibir as músicas da playlist
        if (playlistSongsElem && playlist.songs.length > 0) {
            playlist.songs.forEach((songUrl, index) => {
                const songElem = document.createElement('div');
                songElem.classList.add('playlist-song');

                const songImg = document.createElement('img');
                songImg.src = 'default-cover.png'; // Utilize uma imagem padrão ou mapeie para uma capa correta
                songElem.appendChild(songImg);

                const songInfo = document.createElement('div');
                songInfo.classList.add('playlist-song-info');

                // Remover a extensão do nome da música
                const songTitleText = playlist.songNames[index].replace(/\.[^/.]+$/, '');
                const songTitle = document.createElement('h4');
                songTitle.textContent = songTitleText;
                songInfo.appendChild(songTitle);

                songElem.appendChild(songInfo);

                // Adicione evento de clique para tocar a música
                songElem.addEventListener('click', () => {
                    // Se uma música já estiver tocando, pause-a antes de tocar a nova música
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0; // Reinicia a música anterior
                    }

                    // Criar um novo objeto Audio para a música selecionada
                    currentAudio = new Audio(songUrl);
                    currentAudio.play();
                });

                playlistSongsElem.appendChild(songElem);
            });
        }
    } else {
        console.error("Playlist não encontrada.");
    }
});
