document.addEventListener('DOMContentLoaded', () => {
    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    const likeButton = document.getElementById('like-button');
    const likeCountElem = document.getElementById('like-count');
    const deletePlaylistButton = document.getElementById('delete-playlist-button');
    let currentAudio = null; // Variável para controlar a reprodução da música

    // Função para verificar e obter playlists do localStorage
    function getPlaylists() {
        try {
            return JSON.parse(localStorage.getItem('playlists')) || [];
        } catch (error) {
            console.error('Erro ao carregar playlists do localStorage:', error);
            return [];
        }
    }

    // Função para salvar playlists no localStorage
    function savePlaylists(playlists) {
        try {
            localStorage.setItem('playlists', JSON.stringify(playlists));
        } catch (error) {
            console.error('Erro ao salvar playlists no localStorage:', error);
        }
    }

    // Exibir a capa da playlist escolhida pelo usuário
    if (userPlaylistCoverImg) {
        const userCoverUrl = sessionStorage.getItem('playlistCover');
        if (userCoverUrl) {
            userPlaylistCoverImg.src = userCoverUrl;
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

            // Remover a extensão do nome da música
            const songTitleText = playlistSongNames[index].replace(/\.[^/.]+$/, '');
            const songTitle = document.createElement('h4');
            songTitle.textContent = songTitleText;
            songInfo.appendChild(songTitle);

            songElem.appendChild(songInfo);

            // Adicione evento de clique para tocar a música
            songElem.addEventListener('click', () => {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0; // Reinicia a música anterior
                }
                currentAudio = new Audio(songUrl);
                currentAudio.play();
            });

            playlistSongsElem.appendChild(songElem);
        });
    }

    // Função para atualizar a contagem de curtidas
    const updateLikeCount = () => {
        const likeCount = parseInt(sessionStorage.getItem('likeCount')) || 0;
        likeCountElem.textContent = `${likeCount} curtidas`;
    };

    // Inicializar a contagem de curtidas
    updateLikeCount();

    // Lógica para o botão de curtidas
    likeButton.addEventListener('click', () => {
        let likeCount = parseInt(sessionStorage.getItem('likeCount')) || 0;
        const liked = likeButton.classList.toggle('liked');

        if (liked) {
            likeCount++;
        } else {
            likeCount--;
        }

        sessionStorage.setItem('likeCount', likeCount);
        updateLikeCount();
    });

    // Lógica para o botão de deletar playlist
    deletePlaylistButton.addEventListener('click', () => {
        if (confirm(`Tem certeza de que deseja deletar a playlist "${playlistTitleElem.textContent}"?`)) {
            const playlistName = sessionStorage.getItem('playlistName');
            let playlists = getPlaylists();
            playlists = playlists.filter(playlist => playlist.name !== playlistName);
            savePlaylists(playlists);
            window.location.href = 'user-my-playlist.html';
        }
    });
});
