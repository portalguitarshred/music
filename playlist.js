document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistButton = document.getElementById('create-playlist-button');
    const playlistsContainer = document.getElementById('playlists-container');
    const playlistDetailsSection = document.getElementById('playlist-details-section');
    const backToPlaylistsButton = document.getElementById('back-to-playlists');
    const playlistNameElement = document.getElementById('playlist-name');
    const playlistTracks = document.getElementById('playlist-tracks');
    const addTrackInput = document.getElementById('add-track-input');
    const addTrackButton = document.getElementById('add-track-button');

    let currentPlaylist = null;

    createPlaylistButton.addEventListener('click', () => {
        const playlistName = prompt('Nome da nova playlist:');
        if (playlistName) {
            const playlistElement = document.createElement('div');
            playlistElement.classList.add('playlist-item');
            playlistElement.textContent = playlistName;
            playlistElement.addEventListener('click', () => {
                showPlaylistDetails(playlistName);
            });
            playlistsContainer.appendChild(playlistElement);
        }
    });

    backToPlaylistsButton.addEventListener('click', () => {
        playlistDetailsSection.classList.add('hidden');
    });

    addTrackButton.addEventListener('click', () => {
        addTrackInput.click();
    });

    addTrackInput.addEventListener('change', (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const trackElement = document.createElement('li');
            trackElement.textContent = file.name;
            playlistTracks.appendChild(trackElement);
        }
    });

    function showPlaylistDetails(playlistName) {
        playlistNameElement.textContent = playlistName;
        playlistTracks.innerHTML = ''; // Limpar a lista de músicas
        playlistDetailsSection.classList.remove('hidden');
    }
});
