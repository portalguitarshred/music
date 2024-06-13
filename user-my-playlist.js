document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');
    const stationList = document.getElementById('station-list');

    function loadPlaylists() {
        const playlists = getPlaylists();
        playlistGridContainer.innerHTML = '';

        playlists.forEach((playlist, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.classList.add('playlist-grid-item');

            const img = document.createElement('img');
            img.src = playlist.cover || 'default-cover.png';
            img.alt = playlist.name;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar Playlist';
            deleteButton.classList.add('delete-playlist-button');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (confirm(`Deseja deletar a playlist "${playlist.name}"?`)) {
                    playlists.splice(index, 1);
                    savePlaylists(playlists);
                    window.location.reload();
                }
            });

            playlistItem.appendChild(img);
            playlistItem.appendChild(deleteButton);

            playlistItem.addEventListener('click', () => {
                sessionStorage.setItem('playlistCover', playlist.cover);
                sessionStorage.setItem('playlistName', playlist.name);
                sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
                sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
                window.location.href = 'user-playlist.html';
            });

            playlistGridContainer.appendChild(playlistItem);
        });

        fillEmptySpaces(playlists.length, 6);
        loadStations();
    }

    function fillEmptySpaces(currentCount, maxCount) {
        for (let i = currentCount; i < maxCount; i++) {
            const emptyItem = document.createElement('div');
            emptyItem.classList.add('playlist-grid-item');
            const emptyImg = document.createElement('img');
            emptyImg.src = 'default-cover.png';
            emptyImg.alt = `Espaço ${i + 1}`;
            emptyItem.appendChild(emptyImg);
            playlistGridContainer.appendChild(emptyItem);
        }
    }

    function getPlaylists() {
        return JSON.parse(localStorage.getItem('playlists')) || [];
    }

    function savePlaylists(playlists) {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }

    function loadStations() {
        const stations = [
            { name: 'Rock', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
            { name: 'Pop', url: 'https://stream.zeno.fm/pop-music' },
            // Adicione outras estações conforme necessário
        ];

        stationList.innerHTML = '';

        stations.forEach(station => {
            const li = document.createElement('li');
            li.textContent = station.name;
            li.addEventListener('click', () => {
                const audioPlayer = document.getElementById('audio-player');
                audioPlayer.src = station.url;
                audioPlayer.play();
            });
            stationList.appendChild(li);
        });
    }

    loadPlaylists();
});
