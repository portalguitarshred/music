document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');

    // Função para carregar playlists do localStorage
    function loadPlaylists() {
        const playlists = getPlaylists();
        playlistGridContainer.innerHTML = ''; // Limpar o container

        if (playlists.length === 0) {
            const noPlaylistMsg = document.createElement('div');
            noPlaylistMsg.textContent = 'Nenhuma playlist criada ainda.';
            noPlaylistMsg.style.color = '#fff';
            playlistGridContainer.appendChild(noPlaylistMsg);
        } else {
            playlists.forEach((playlist, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.classList.add('playlist-grid-item');

                const img = document.createElement('img');
                img.src = playlist.cover || 'capa-playlist.png';
                img.alt = playlist.name;

                // Adicionar botão de deletar
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar Playlist';
                deleteButton.classList.add('delete-playlist-button');
                deleteButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (confirm(`Deseja deletar a playlist "${playlist.name}"?`)) {
                        playlists.splice(index, 1);
                        savePlaylists(playlists);
                        loadPlaylists(); // Recarregar playlists após deletar
                    }
                });

                playlistItem.appendChild(img);
                playlistItem.appendChild(deleteButton);

                playlistItem.addEventListener('click', () => {
                    sessionStorage.setItem('playlistCover', playlist.cover);
                    sessionStorage.setItem('playlistName', playlist.name);
                    sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
                    sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
                    window.location.href = 'user-playlist.html';
                });

                playlistGridContainer.appendChild(playlistItem);
            });

            // Adicionar espaços vazios se houver menos de 6 playlists
            fillEmptySpaces(playlists.length, 6);
        }
    }

    function fillEmptySpaces(currentCount, maxCount) {
        for (let i = currentCount; i < maxCount; i++) {
            const emptyItem = document.createElement('div');
            emptyItem.classList.add('playlist-grid-item');
            const emptyImg = document.createElement('img');
            emptyImg.src = 'capa-playlist.png';
            emptyImg.alt = `Espaço ${i + 1}`;
            emptyItem.appendChild(emptyImg);
            playlistGridContainer.appendChild(emptyItem);
        }
    }

    // Função para obter playlists do localStorage
    function getPlaylists() {
        return JSON.parse(localStorage.getItem('playlists')) || [];
    }

    // Função para salvar playlists no localStorage
    function savePlaylists(playlists) {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }

    // Carregar as playlists ao inicializar a página
    loadPlaylists();
});
