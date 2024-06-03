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

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultsList = document.getElementById('results-list');

    let currentPlaylist = null;
    let currentAudio = new Audio();
    let userPlaylists = JSON.parse(localStorage.getItem('userPlaylists')) || {};

    function savePlaylists() {
        localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    }

    function loadPlaylists() {
        playlistsContainer.innerHTML = '';
        for (let playlistName in userPlaylists) {
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
        if (playlistName && !userPlaylists[playlistName]) {
            const tracks = [];
            const trackElements = newPlaylistTracks.querySelectorAll('li');
            trackElements.forEach(trackElement => {
                tracks.push({
                    name: trackElement.querySelector('.track-name').textContent,
                    url: trackElement.dataset.url
                });
            });
            userPlaylists[playlistName] = tracks;
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
        const tracks = userPlaylists[playlistName];
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            
            const coverImage = document.createElement('div');
            coverImage.classList.add('track-cover');

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

    // Função para buscar músicas na API do Deezer
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        searchTracks(query);
    });

    function searchTracks(query) {
        const script = document.createElement('script');
        script.src = `https://api.deezer.com/search?q=${query}&output=jsonp&callback=handleDeezerResponse`;
        document.body.appendChild(script);
    }

    window.handleDeezerResponse = function(data) {
        console.log('Dados da busca:', data); // Log para depuração
        const tracks = data.data;
        resultsList.innerHTML = ''; // Limpa os resultados anteriores
        tracks.forEach(track => {
            const li = document.createElement('li');
            li.textContent = `${track.title} - ${track.artist.name}`;
            const addButton = document.createElement('button');
            addButton.textContent = 'Adicionar à Playlist';
            addButton.addEventListener('click', () => addToPlaylist(track));
            li.appendChild(addButton);
            resultsList.appendChild(li);
        });
    };

    function addToPlaylist(track) {
        const playlistName = prompt('Nome da playlist:');
        if (playlistName && !userPlaylists[playlistName]) {
            userPlaylists[playlistName] = [];
        }
        if (userPlaylists[playlistName]) {
            userPlaylists[playlistName].push({
                name: track.title,
                artist: track.artist.name,
                url: track.preview // URL para o preview da música
            });
            savePlaylists();
            alert(`Música ${track.title} adicionada à playlist ${playlistName}`);
        } else {
            alert('Nome da playlist é inválido.');
        }
    }

    loadPlaylists();
});
