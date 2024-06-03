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
            const reader = new FileReader();
            reader.onload = function(e) {
                const trackElement = document.createElement('li');
                trackElement.textContent = file.name;
                trackElement.dataset.url = e.target.result;
                trackElement.addEventListener('click', () => {
                    playTrack(e.target.result);
                });
                playlistTracks.appendChild(trackElement);
                playlists[playlistName].push({
                    name: file.name,
                    url: e.target.result
                });
                savePlaylists();
            };
            reader.readAsDataURL(file);
        }
    });

    function showPlaylistDetails(playlistName) {
        playlistNameElement.textContent = playlistName;
        playlistTracks.innerHTML = ''; // Limpar a lista de músicas
        const tracks = playlists[playlistName];
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            trackElement.textContent = track.name;
            trackElement.dataset.url = track.url;
            trackElement.addEventListener('click', () => {
                playTrack(track.url);
            });
            playlistTracks.appendChild(trackElement);
        });
        playlistDetailsSection.classList.remove('hidden');
    }

    function playTrack(url) {
        if (currentAudio.src !== url) {
            currentAudio.src = url;
            currentAudio.play();
        } else if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }

    loadPlaylists();
});
