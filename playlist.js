document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const playlistTracks = document.getElementById('playlist-tracks');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        await searchTracks(query);
    });

    async function searchTracks(query) {
        const url = `https://itunes.apple.com/search?term=${query}&media=music&limit=20`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Dados da busca:', data); // Log para depuração
            if (data && data.results) {
                const tracks = data.results;
                showSearchResultsAsPlaylist(tracks);
            } else {
                alert('Nenhum resultado encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar músicas:', error);
            alert('Erro ao buscar músicas. Verifique o console para mais detalhes.');
        }
    }

    function showSearchResultsAsPlaylist(tracks) {
        const playlistName = `Resultados de pesquisa para "${searchInput.value}"`;
        playlistTracks.innerHTML = ''; // Limpar a lista de músicas
        
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            
            const coverImage = document.createElement('div');
            coverImage.classList.add('track-cover');
            const trackCoverImg = document.createElement('img');
            trackCoverImg.src = track.artworkUrl100;
            coverImage.appendChild(trackCoverImg);

            const trackName = document.createElement('div');
            trackName.classList.add('track-name');
            trackName.textContent = `${track.trackName} - ${track.artistName}`;

            trackElement.appendChild(coverImage);
            trackElement.appendChild(trackName);
            trackElement.dataset.url = track.previewUrl;
            trackElement.addEventListener('click', () => {
                playTrack(track.previewUrl);
            });
            playlistTracks.appendChild(trackElement);
        });
    }

    function playTrack(url) {
        const audioPlayer = new Audio(url);
        audioPlayer.play();
    }
});
