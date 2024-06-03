document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistButton = document.getElementById('create-playlist-button');
    const playlistsContainer = document.getElementById('playlists-container');
    const playlistDetailsSection = document.getElementById('playlist-details-section');
    const backToPlaylistsButton = document.getElementById('back-to-playlists');

    let playlists = [];

    function renderPlaylists() {
        playlistsContainer.innerHTML = '';
        playlists.forEach((playlist, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.classList.add('playlist-item');
            playlistItem.textContent = playlist.name;
            playlistItem.addEventListener('click', () => showPlaylistDetails(index));
            playlistsContainer.appendChild(playlistItem);
        });
    }

    function showPlaylistDetails(index) {
        const playlist = playlists[index];
        const playlistName = document.getElementById('playlist-name');
        const playlistTracks = document.getElementById('playlist-tracks');
        
        playlistName.textContent = playlist.name;
        playlistTracks.innerHTML = '';
        playlist.tracks.forEach(track => {
            const trackItem = document.createElement('li');
            trackItem.textContent = track;
            playlistTracks.appendChild(trackItem);
        });

        playlistDetailsSection.classList.remove('hidden');
        playlistsContainer.classList.add('hidden');
    }

    function createPlaylist() {
        const playlistName = prompt('Nome da nova playlist:');
        if (playlistName) {
            playlists.push({ name: playlistName, tracks: [] });
            renderPlaylists();
        }
    }

    createPlaylistButton.addEventListener('click', createPlaylist);
    backToPlaylistsButton.addEventListener('click', () => {
        playlistDetailsSection.classList.add('hidden');
        playlistsContainer.classList.remove('hidden');
    });

    renderPlaylists();
});
