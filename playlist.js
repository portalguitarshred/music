document.addEventListener('DOMContentLoaded', () => {
    const addSongButton = document.getElementById('add-song-button');
    const songNameInput = document.getElementById('song-name');
    const songUrlInput = document.getElementById('song-url');
    const playlistSongsContainer = document.getElementById('playlist-songs');

    addSongButton.addEventListener('click', () => {
        const songName = songNameInput.value;
        const songUrl = songUrlInput.value;

        if (songName && songUrl) {
            const song = {
                name: songName,
                url: songUrl
            };

            let songs = JSON.parse(sessionStorage.getItem('playlistSongs')) || [];
            songs.push(song);
            sessionStorage.setItem('playlistSongs', JSON.stringify(songs));

            addSongToPlaylist(song);
            songNameInput.value = '';
            songUrlInput.value = '';
        }
    });

    function addSongToPlaylist(song) {
        const songElement = document.createElement('div');
        songElement.className = 'song';

        const songInfo = document.createElement('p');
        songInfo.textContent = song.name;

        const playButton = document.createElement('button');
        playButton.textContent = 'Tocar';
        playButton.addEventListener('click', () => {
            const audio = new Audio(song.url);
            audio.play();
        });

        songElement.appendChild(songInfo);
        songElement.appendChild(playButton);

        playlistSongsContainer.appendChild(songElement);
    }

    function loadPlaylistSongs() {
        const songs = JSON.parse(sessionStorage.getItem('playlistSongs')) || [];
        songs.forEach(song => addSongToPlaylist(song));
    }

    loadPlaylistSongs();
});
