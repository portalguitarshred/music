document.addEventListener('DOMContentLoaded', () => {
    console.log("user-playlist.js carregado");

    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    const likeButton = document.getElementById('like-button');
    const likeCountElem = document.getElementById('like-count');
    const deletePlaylistButton = document.getElementById('delete-playlist-button');
    let currentAudio = null;

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
                console.log("Música clicada:", songUrl);
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }
                currentAudio = new Audio(songUrl);
                currentAudio.play().then(() => {
                    console.log("Reproduzindo áudio:", songUrl);
                }).catch(error => {
                    console.error('Erro ao tentar reproduzir o áudio:', error);
                });
            });

            // Adicionar os três pontinhos verticais (menu de opções)
            const optionsMenu = document.createElement('div');
            optionsMenu.classList.add('options-menu');

            const optionsButton = document.createElement('button');
            optionsButton.classList.add('options-button');
            optionsButton.innerHTML = '&#8942;'; // Caractere de três pontinhos verticais
            optionsButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Previne que o clique no botão toque a música
                optionsMenu.classList.toggle('open');
            });

            const menuContent = document.createElement('div');
            menuContent.classList.add('menu-content');

            const shareOption = document.createElement('button');
            shareOption.innerHTML = '<i class="fas fa-share"></i> Compartilhar com amigos';
            shareOption.addEventListener('click', () => {
                const shareData = {
                    title: 'Minha Playlist',
                    text: `Confira essa música: ${songTitleText}`,
                    url: songUrl
                };
                navigator.share(shareData).catch(console.error);
                optionsMenu.classList.remove('open');
            });

            const addToPlaylistOption = document.createElement('button');
            addToPlaylistOption.innerHTML = '<i class="fas fa-music"></i> Adicionar música na playlist';
            addToPlaylistOption.addEventListener('click', () => {
                alert(`A música "${songTitleText}" foi adicionada à playlist.`);
                optionsMenu.classList.remove('open');
            });

            const addToFavoritesOption = document.createElement('button');
            addToFavoritesOption.innerHTML = '<i class="fas fa-heart"></i> Adicionar aos favoritos';
            addToFavoritesOption.addEventListener('click', () => {
                alert(`A música "${songTitleText}" foi adicionada aos favoritos.`);
                optionsMenu.classList.remove('open');
            });

            const removeOption = document.createElement('button');
            removeOption.innerHTML = '<i class="fas fa-trash"></i> Remover da Playlist';
            removeOption.addEventListener('click', () => {
                playlistSongsElem.removeChild(songElem);
                currentPlaylist.songs.splice(index, 1);
                currentPlaylist.songNames.splice(index, 1);
                sessionStorage.setItem('playlists', JSON.stringify(playlists));
                optionsMenu.classList.remove('open');
            });

            menuContent.appendChild(shareOption);
            menuContent.appendChild(addToPlaylistOption);
            menuContent.appendChild(addToFavoritesOption);
            menuContent.appendChild(removeOption);
            optionsMenu.appendChild(optionsButton);
            optionsMenu.appendChild(menuContent);
            songElem.appendChild(optionsMenu);

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
