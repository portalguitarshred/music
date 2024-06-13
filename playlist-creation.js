document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    if (!savePlaylistButton || !playlistCoverInput || !playlistNameInput || !playlistFilesInput) {
        console.error('Elementos essenciais não foram encontrados.');
        return;
    }

    savePlaylistButton.addEventListener('click', () => {
        console.log('Save playlist button clicked');
        const playlistName = playlistNameInput.value.trim();
        const files = playlistFilesInput.files;

        if (!playlistName) {
            alert("Por favor, insira o nome da playlist.");
            console.error('Nome da playlist ausente');
            return;
        }

        const songURLs = Array.from(files).map(file => URL.createObjectURL(file));
        const songNames = Array.from(files).map(file => file.name);

        const newPlaylist = {
            name: playlistName,
            cover: '', // Será definido após leitura do arquivo da capa
            songs: songURLs,
            songNames: songNames,
        };

        if (playlistCoverInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                newPlaylist.cover = event.target.result;
                savePlaylist(newPlaylist);
            };
            reader.readAsDataURL(playlistCoverInput.files[0]);
        } else {
            newPlaylist.cover = 'default-cover.png'; // URL da imagem padrão
            savePlaylist(newPlaylist);
        }
    });

    function savePlaylist(playlist) {
        const playlists = getPlaylists();
        playlists.push(playlist);
        savePlaylists(playlists);
        console.log('Playlist salva com sucesso:', playlist);
        window.location.href = 'user-my-playlist.html';
    }
});

function getPlaylists() {
    try {
        return JSON.parse(localStorage.getItem('playlists')) || [];
    } catch (error) {
        console.error('Erro ao carregar playlists do localStorage:', error);
        return [];
    }
}

function savePlaylists(playlists) {
    try {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    } catch (error) {
        console.error('Erro ao salvar playlists no localStorage:', error);
    }
}
