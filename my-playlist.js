document.addEventListener('DOMContentLoaded', () => {
    const playlistGridItems = document.querySelectorAll('.playlist-grid-item');

    playlistGridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Lógica para carregar a playlist correspondente
            const playlistId = index; // Use o índice ou outra identificação para a playlist
            console.log(`Playlist ${playlistId} clicada`);
            // Redirecionar ou carregar a playlist
            window.location.href = `playlist-detail.html?playlistId=${playlistId}`;
        });
    });

    // Exemplo de estações - você deve substituir isso pelos dados reais das estações
    const stations = [
        { name: 'Rock', url: 'https://example.com/rock', img: 'station-rock.jpg' },
        { name: 'Jazz', url: 'https://example.com/jazz', img: 'station-jazz.jpg' },
        { name: 'Classical', url: 'https://example.com/classical', img: 'station-classical.jpg' }
    ];

    const stationList = document.getElementById('station-list');

    stations.forEach(station => {
        const stationItem = document.createElement('li');
        stationItem.innerHTML = `<img src="${station.img}" alt="${station.name}">`;
        stationItem.addEventListener('click', () => {
            // Lógica para tocar a estação
            console.log(`Estação ${station.name} selecionada`);
            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.src = station.url;
            audioPlayer.play();
        });
        stationList.appendChild(stationItem);
    });

    // Ajustar volume
    const volumeControl = document.getElementById('volume-control');
    volumeControl.addEventListener('input', (event) => {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.volume = event.target.value;
    });
});
