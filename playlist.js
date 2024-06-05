// URL base da API do Deezer para busca
const DEEZER_API_URL = 'https://api.deezer.com/search';

// Função para buscar músicas
function searchMusic() {
    // Obter a consulta de busca do campo de entrada
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    // Formatar a URL de busca com os parâmetros corretos
    const url = `${DEEZER_API_URL}?q=${encodeURIComponent(query)}`;
    console.log('Searching for:', url); // Log para depuração

    // Fazer a requisição GET para a API do Deezer
    fetch(url)
        .then(response => {
            // Verificar se a resposta é bem-sucedida
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
    // Obter o contêiner de resultados
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    // Verificar se há resultados
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhuma música encontrada.</p>';
        return;
    }

    // Para cada resultado, criar um elemento de exibição
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.textContent = `${result.artist.name} - ${result.title}`;
        const addButton = document.createElement('button');
        addButton.textContent = 'Adicionar à Playlist';
        // Adicionar funcionalidade ao botão para adicionar à playlist
        addButton.onclick = () => addToPlaylist(result.title, result.preview);
        resultDiv.appendChild(addButton);
        resultsContainer.appendChild(resultDiv);
    });
}

// Função para adicionar uma música manualmente
function addMusic() {
    const musicUrl = document.getElementById('musicUrl').value;
    if (!musicUrl) return;

    const musicTitle = "User Added"; // Título padrão para músicas adicionadas manualmente
    addToPlaylist(musicTitle, musicUrl);
    document.getElementById('musicUrl').value = ''; // Limpar o campo após adicionar
}

// Função para adicionar música à playlist
function addToPlaylist(title, link) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    playlist.push({ title, link });
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
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = `${item.title} (Áudio)`;
        a.onclick = (event) => {
            event.preventDefault();
            playAudio(item.link);
        };
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
