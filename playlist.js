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
    let currentAudio = new Audio();
    let playlists = JSON.parse(localStorage.getItem('playlists')) || {};

    function savePlaylists() {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }

    function loadPlaylists() {
        playlistsContainer.innerHTML = '';
        for (let playlistName in playlists) {
            const playlistElement = document.createElement('div');
            playlistElement.classList.add('playlist-item');
            playlistElement.textContent = playlistName;
            playlistElement.addEventListener('click', () => {
                showPlaylistDetails(playlistName);
            });
            playlistsContainer.appendChild(playlistElement);
        }
    }

    createPlaylistButton.addEventListener('click', () => {
        const playlistName = prompt('Nome da nova playlist:');
        if (playlistName && !playlists[playlistName]) {
            playlists[playlistName] = [];
            savePlaylists();
            loadPlaylists();
        } else {
            alert('Nome da playlist já existe ou é inválido.');
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
        const playlistName = playlistNameElement.textContent;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            playlists[playlistName].push(file.name);
            const trackElement = document.createElement('li');
            trackElement.textContent = file.name;
            trackElement.addEventListener('click', () => {
                playTrack(file);
            });
            playlistTracks.appendChild(trackElement);
        }
        savePlaylists();
    });

    function showPlaylistDetails(playlistName) {
        playlistNameElement.textContent = playlistName;
        playlistTracks.innerHTML = ''; // Limpar a lista de músicas
        const tracks = playlists[playlistName];
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            trackElement.textContent = track;
            trackElement.addEventListener('click', () => {
                playTrack(track);
            });
            playlistTracks.appendChild(trackElement);
        });
        playlistDetailsSection.classList.remove('hidden');
    }

    function playTrack(track) {
        if (currentAudio.src !== track) {
            currentAudio.src = URL.createObjectURL(track);
            currentAudio.play();
        } else if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }

    loadPlaylists();
});
