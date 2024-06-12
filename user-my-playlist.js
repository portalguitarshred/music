// user-my-playlist.js

document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    // Limpar o container antes de adicionar novos elementos
    playlistGridContainer.innerHTML = '';

    playlists.forEach((playlist, index) => {
        // Cria um novo elemento para a playlist
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-grid-item');

        const img = document.createElement('img');
        img.src = playlist.cover || 'default-cover.png'; // Use capa padrão se não houver uma capa salva
        img.alt = playlist.name;

        // Cria o botão de deletar playlist
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar Playlist';
        deleteButton.classList.add('delete-playlist-button');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Impedir que o clique no botão abra a playlist
            if (confirm(`Tem certeza de que deseja deletar a playlist "${playlist.name}"?`)) {
                // Remove a playlist do array e atualiza o localStorage
                playlists.splice(index, 1);
                localStorage.setItem('playlists', JSON.stringify(playlists));
                // Recarrega a página para atualizar a lista
                window.location.reload();
            }
        });

        // Adiciona a imagem e o botão ao item da playlist
        playlistItem.appendChild(img);
        playlistItem.appendChild(deleteButton);

        // Adiciona o evento de clique para abrir a playlist
        playlistItem.addEventListener('click', (event) => {
            // Evita que o clique no botão "Deletar Playlist" abra a playlist
            if (!event.target.matches('.delete-playlist-button')) {
                sessionStorage.setItem('playlistCover', playlist.cover);
                sessionStorage.setItem('playlistName', playlist.name);
                sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
                sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
                window.location.href = 'user-playlist.html';
            }
        });

        // Adiciona o item da playlist ao container
        playlistGridContainer.appendChild(playlistItem);
    });

    // Preencher os espaços restantes com itens vazios se necessário
    const totalPlaylists = playlists.length;
    const totalSpaces = 6;
    for (let i = totalPlaylists; i < totalSpaces; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.classList.add('playlist-grid-item');
        const emptyImg = document.createElement('img');
        emptyImg.src = 'default-cover.png'; // Use capa padrão para espaços vazios
        emptyImg.alt = `Espaço ${i + 1}`;
        emptyItem.appendChild(emptyImg);
        playlistGridContainer.appendChild(emptyItem);
    }
});
