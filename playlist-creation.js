document.addEventListener('DOMContentLoaded', () => {
    const savePlaylistButton = document.getElementById('save-playlist-button');
    const playlistCoverInput = document.getElementById('playlist-cover-input');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistFilesInput = document.getElementById('playlist-files');

    savePlaylistButton.addEventListener('click', () => {
        const playlistName = playlistNameInput.value.trim();
        const playlistCoverFile = playlistCoverInput.files[0];
        const files = playlistFilesInput.files;

        if (!playlistName) {
            alert("Por favor, insira o nome da playlist.");
            return;
        }

        const songURLs = Array.from(files).map(file => URL.createObjectURL(file));
        const songNames = Array.from(files).map(file => file.name);

        if (playlistCoverFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const coverUrl = event.target.result;
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
        window.location.href = 'user-my-playlist.html';
    }

    function getPlaylists() {
        return JSON.parse(localStorage.getItem('playlists')) || [];
    }

    function savePlaylists(playlists) {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }
});
