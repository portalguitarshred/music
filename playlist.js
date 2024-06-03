document.addEventListener('DOMContentLoaded', () => {
    const createPlaylistButton = document.getElementById('create-playlist-button');
    const playlistsContainer = document.getElementById('playlists-container');
    const playlistDetailsSection = document.getElementById('playlist-details-section');
    const backToPlaylistsButton = document.getElementById('back-to-playlists');
    const playlistNameElement = document.getElementById('playlist-name');
    const playlistTracks = document.getElementById('playlist-tracks');
    const addTrackInput = document.getElementById('add-track-input');
    const addTrackButton = document.getElementById('add-track-button');
    const popup = document.getElementById('playlist-popup');
    const closePopup = document.getElementById('close-popup');
    const newPlaylistNameInput = document.getElementById('new-playlist-name');
    const newPlaylistTracks = document.getElementById('new-playlist-tracks');
    const savePlaylistButton = document.getElementById('save-playlist-button');

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
        newPlaylistNameInput.value = '';
        newPlaylistTracks.innerHTML = '';
        popup.classList.remove('hidden');
    });

    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    addTrackButton.addEventListener('click', () => {
        addTrackInput.click();
    });

    addTrackInput.addEventListener('change', (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function(e) {
                const trackElement = document.createElement('li');
                
                const coverImage = document.createElement('div');
                coverImage.classList.add('track-cover');
                // Aqui você pode adicionar uma imagem de capa padrão ou permitir que o usuário defina uma
                
                const trackName = document.createElement('div');
                trackName.classList.add('track-name');
                trackName.textContent = file.name;

                trackElement.appendChild(coverImage);
                trackElement.appendChild(trackName);
                trackElement.dataset.url = e.target.result;
                newPlaylistTracks.appendChild(trackElement);
            };
            reader.readAsDataURL(file);
        }
    });

    savePlaylistButton.addEventListener('click', () => {
        const playlistName = newPlaylistNameInput.value;
        if (playlistName && !playlists[playlistName]) {
            const tracks = [];
            const trackElements = newPlaylistTracks.querySelectorAll('li');
            trackElements.forEach(trackElement => {
                tracks.push({
                    name: trackElement.querySelector('.track-name').textContent,
                    url: trackElement.dataset.url
                });
            });
            playlists[playlistName] = tracks;
            savePlaylists();
            loadPlaylists();
            popup.classList.add('hidden');
        } else {
            alert('Nome da playlist já existe ou é inválido.');
        }
    });

    backToPlaylistsButton.addEventListener('click', () => {
        playlistDetailsSection.classList.add('hidden');
    });

    function showPlaylistDetails(playlistName) {
        playlistNameElement.textContent = playlistName;
        playlistTracks.innerHTML = ''; // Limpar a lista de músicas
        const tracks = playlists[playlistName];
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            
            const coverImage = document.createElement('div');
            coverImage.classList.add('track-cover');
            // Aqui você pode adicionar uma imagem de capa padrão ou permitir que o usuário defina uma

            const trackName = document.createElement('div');
            trackName.classList.add('track-name');
            trackName.textContent = track.name;

            trackElement.appendChild(coverImage);
            trackElement.appendChild(trackName);
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
