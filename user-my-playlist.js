document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');

    const playlistCover = sessionStorage.getItem('playlistCover');
    const playlistName = sessionStorage.getItem('playlistName');
    const playlistSongs = JSON.parse(sessionStorage.getItem('playlistSongs') || '[]');

    // Limpar o container antes de adicionar novos elementos
    playlistGridContainer.innerHTML = '';

    // Verificar se há uma playlist salva
    if (playlistName && playlistSongs.length > 0) {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-grid-item');

        const img = document.createElement('img');
        img.src = playlistCover || 'capa-playlist.png'; // Use capa padrão se não houver uma capa salva
        img.alt = playlistName;

        playlistItem.appendChild(img);

        // Adicionar evento de clique para abrir a playlist
        playlistItem.addEventListener('click', () => {
            window.location.href = 'user-playlist.html';
        });

        playlistGridContainer.appendChild(playlistItem);
    } else {
        // Exibir mensagem se não houver playlist
        const noPlaylistMsg = document.createElement('div');
        noPlaylistMsg.textContent = 'Nenhuma playlist criada ainda.';
        noPlaylistMsg.style.color = '#fff'; // Adicione estilos conforme necessário
        playlistGridContainer.appendChild(noPlaylistMsg);
    }
});
