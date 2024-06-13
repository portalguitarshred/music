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
            cover: playlistCoverInput.files[0] ? URL.createObjectURL(playlistCoverInput.files[0]) : 'default-cover.png',
            songs: songURLs,
            songNames: songNames,
        };

        const playlists = getPlaylists();
        playlists.push(newPlaylist);
        savePlaylists(playlists);
        console.log('Playlist salva com sucesso:', newPlaylist);
        window.location.href = 'user-my-playlist.html';
    });
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
