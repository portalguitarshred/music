document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
        console.log('Save playlist button clicked');
        const playlistName = playlistNameInput.value.trim();
        const playlistCoverFile = playlistCoverInput.files[0];
        const files = playlistFilesInput.files;

        if (!playlistName) {
            alert("Por favor, insira o nome da playlist.");
            console.log('Nome da playlist ausente');
            return;
        }

        const songURLs = Array.from(files).map(file => URL.createObjectURL(file));
        const songNames = Array.from(files).map(file => file.name);

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
                console.log('Playlist cover loaded:', coverUrl);
                savePlaylist(playlistName, coverUrl, songURLs, songNames);
            };
            reader.readAsDataURL(playlistCoverFile);
        } else {
            savePlaylist(playlistName, 'capa-playlist.png', songURLs, songNames);
        }
    });

    function savePlaylist(name, cover, songs, songNames) {
        const playlists = getPlaylists();
        const newPlaylist = { name, cover, songs, songNames };
        playlists.push(newPlaylist);
        savePlaylists(playlists);
        console.log('Playlist salva:', newPlaylist);
        window.location.href = 'user-my-playlist.html';
    }

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
});
