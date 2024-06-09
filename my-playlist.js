document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const statusMessage = document.createElement('div');
    statusMessage.id = 'status-message';
    document.body.appendChild(statusMessage);
    let currentPlaying = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const stations = [
        { name: 'Rock Station', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
        { name: 'Classic Rock', url: 'https://stream.zeno.fm/amepggt3jxptv' },
        { name: 'Instrumental', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
    ];

    function playStation(station, li) {
        audioPlayer.src = station.url;
        audioPlayer.play();
        if (currentPlaying) {
            currentPlaying.classList.remove('playing');
            currentPlaying.style.backgroundColor = '';
            currentPlaying.querySelector('.play-pause-icon').classList.remove('fa-pause');
            currentPlaying.querySelector('.play-pause-icon').classList.add('fa-play');
            currentPlaying.querySelector('.spectrum').style.display = 'none';
        }
        li.classList.add('playing');
        li.style.backgroundColor = '#05d26d'; // Cor verde padrão
        li.querySelector('.play-pause-icon').classList.remove('fa-play');
        li.querySelector('.play-pause-icon').classList.add('fa-pause');
        li.querySelector('.spectrum').style.display = 'flex';
        currentPlaying = li;
    }

    function pauseStation(li) {
        audioPlayer.pause();
        li.classList.remove('playing');
        li.style.backgroundColor = '';
        li.querySelector('.play-pause-icon').classList.remove('fa-pause');
        li.querySelector('.play-pause-icon').classList.add('fa-play');
        li.querySelector('.spectrum').style.display = 'none';
        currentPlaying = null;
    }

    stations.forEach((station, index) => {
        const li = document.createElement('li');
        li.textContent = station.name;

        const heartIcon = document.createElement('i');
       
