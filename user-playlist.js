document.addEventListener('DOMContentLoaded', () => {
    console.log("user-playlist.js carregado");

    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    const likeButton = document.getElementById('like-button');
    const likeCountElem = document.getElementById('like-count');
    const deletePlaylistButton = document.getElementById('delete-playlist-button');

    const currentPlaylistIndex = parseInt(sessionStorage.getItem('currentPlaylistIndex'), 10);
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');
    const currentPlaylist = playlists[currentPlaylistIndex];

    if (!currentPlaylist) {
        console.error("Nenhuma playlist encontrada no índice:", currentPlaylistIndex);
        return;
    }

    // Exibir a capa da playlist escolhida pelo usuário
    if (userPlaylistCoverImg) {
        userPlaylistCoverImg.src = currentPlaylist.cover || 'default-cover.jpg';
        console.log("Capa da playlist exibida:", currentPlaylist.cover);
    }

    // Exibir o título da playlist
    if (playlistTitleElem) {
        playlistTitleElem.textContent = currentPlaylist.name;
        console.log("Título da playlist exibido:", currentPlaylist.name);
    }

    // Limpar elementos existentes no playlistSongsElem
    playlistSongsElem.innerHTML = '';

    // Exibir as músicas da playlist
    if (playlistSongsElem) {
        currentPlaylist.songs.forEach((songUrl, index) => {
            const songElem = document.createElement('div');
            songElem.classList.add('playlist-song');

            const songImg = document.createElement('img');
            songImg.src = 'default-cover.png'; // Utilize uma imagem padrão ou mapeie para uma capa correta
            songElem.appendChild(songImg);

            const songInfo = document.createElement('div');
            songInfo.classList.add('playlist-song-info');

            // Remover a extensão do nome da música
            const songTitleText = currentPlaylist.songNames[index].replace(/\.[^/.]+$/, '');
            const songTitle = document.createElement('h4');
            songTitle.textContent = songTitleText;
            songInfo.appendChild(songTitle);

            songElem.appendChild(songInfo);

            // Adicionar evento de clique para tocar a música
            songElem.addEventListener('click', () => {
                playAudio(songUrl);
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

    // Lógica para deletar a playlist
    deletePlaylistButton.addEventListener('click', () => {
        playlists.splice(currentPlaylistIndex, 1);
        sessionStorage.setItem('playlists', JSON.stringify(playlists));
        window.location.href = 'user-my-playlist.html';
    });
});

// Adicione a função playAudio ao final do arquivo user-playlist.js
function playAudio(url) {
    console.log("Iniciando reprodução de áudio:", url);
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(url);
    window.currentAudio.play().then(() => {
        console.log("Reproduzindo áudio:", url);
    }).catch(error => {
        console.error('Erro ao tentar reproduzir o áudio:', error);
    });
}
