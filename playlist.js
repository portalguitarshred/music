// URL base da API do Deezer para busca
const DEEZER_API_URL = 'https://api.deezer.com/search';

// Função para buscar músicas
function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    const url = `${DEEZER_API_URL}?q=${encodeURIComponent(query)}&limit=10`;
    console.log('Searching for:', url); // Log para depuração

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar músicas: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Log para depuração
            displayResults(data.data); // Mostrar os resultados
        })
        .catch(error => console.error('Erro ao buscar músicas:', error)); // Log de erro
}

// Função para exibir os resultados da busca
function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhuma música encontrada.</p>';
        return;
    }

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-item');

        const img = document.createElement('img');
        img.src = result.album.cover_small;
        img.alt = `${result.title} cover`;

        const textDiv = document.createElement('div');
        textDiv.textContent = `${result.artist.name} - ${result.title}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Adicionar à Playlist';
        addButton.onclick = () => addToPlaylist(result);

        resultDiv.appendChild(img);
        resultDiv.appendChild(textDiv);
        resultDiv.appendChild(addButton);
        resultsContainer.appendChild(resultDiv);
    });
}

// Função para adicionar música à playlist
function addToPlaylist(result) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    playlist.push(result);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
}

// Função para exibir a playlist
function displayPlaylist() {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    const playlistEl = document.getElementById('playlist');
    playlistEl.innerHTML = '';
    playlist.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('playlist-item');

        const img = document.createElement('img');
        img.src = item.album.cover_small;
        img.alt = `${item.title} cover`;

        const textDiv = document.createElement('div');
        textDiv.textContent = `${item.artist.name} - ${item.title}`;

        const a = document.createElement('a');
        a.href = '#';
        a.textContent = 'Tocar';
        a.onclick = (event) => {
            event.preventDefault();
            playAudio(item.preview);
        };

        li.appendChild(img);
        li.appendChild(textDiv);
        li.appendChild(a);
        playlistEl.appendChild(li);
    });
}

// Função para reproduzir o áudio
function playAudio(link) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = link;
    audioPlayer.play().catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
    });
}

// Carregar a playlist ao carregar a página
document.addEventListener('DOMContentLoaded', displayPlaylist);
