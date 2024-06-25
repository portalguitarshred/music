document.addEventListener('DOMContentLoaded', () => {
    const userPlaylistCoverImg = document.getElementById('user-playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title');
    const playlistSongsElem = document.getElementById('playlist-songs');
    const likeButton = document.getElementById('like-button');
    const likeCountElem = document.getElementById('like-count');
    const deletePlaylistButton = document.getElementById('delete-playlist-button');
    let currentAudio = null; // Variável para controlar a reprodução da música

    const currentPlaylistIndex = parseInt(sessionStorage.getItem('currentPlaylistIndex'), 10);
    const playlists = JSON.parse(sessionStorage.getItem('playlists') || '[]');
    const currentPlaylist = playlists[currentPlaylistIndex];

    // Exibir a capa da playlist escolhida pelo usuário
    if (userPlaylistCoverImg && currentPlaylist) {
        userPlaylistCoverImg.src = currentPlaylist.cover || 'default-cover.jpg';
    }

    // Exibir o título da playlist
    if (playlistTitleElem && currentPlaylist) {
        playlistTitleElem.textContent = currentPlaylist.name;
    }

    // Limpar elementos existentes no playlistSongsElem
    playlistSongsElem.innerHTML = '';

    // Exibir as músicas da playlist
    if (playlistSongsElem && currentPlaylist) {
        currentPlaylist.songs.forEach((songUrl, index) => {
            console.log(`Adicionando música ${index + 1}: ${currentPlaylist.songNames[index]}`);
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

            // Adicione evento de clique para tocar a música
            songElem.addEventListener('click', () => {
                console.log(`Tentando reproduzir a música: ${songTitleText}`);
                // Se uma música já estiver tocando, pause-a antes de tocar a nova música
                if (currentAudio) {
                    console.log('Pausando a música atual');
                    currentAudio.pause();
                    currentAudio.currentTime = 0; // Reinicia a música anterior
                }

                // Criar um novo objeto Audio para a música selecionada
                currentAudio = new Audio(songUrl);

                currentAudio.addEventListener('canplaythrough', () => {
                    console.log('O áudio pode ser reproduzido completamente sem interrupções.');
                    currentAudio.play().catch(error => {
                        console.error('Erro ao tentar reproduzir o áudio:', error);
                    });
                });

                currentAudio.addEventListener('error', (e) => {
                    console.error('Erro ao carregar o áudio:', e);
                });

                currentAudio.load();
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
                // Lógica para compartilhar a música
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
                // Atualizar sessionStorage
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
