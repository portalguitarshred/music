function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}+music&key=YOUR_API_KEY&cx=YOUR_SEARCH_ENGINE_ID`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Erro ao buscar músicas:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhuma música encontrada.</p>';
        return;
    }

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.textContent = result.title;
        const addButton = document.createElement('button');
        addButton.textContent = 'Adicionar à Playlist';
        addButton.onclick = () => addToPlaylist(result.link);
        resultDiv.appendChild(addButton);
        resultsContainer.appendChild(resultDiv);
    });
}

function addToPlaylist(link) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    playlist.push(link);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
}

function displayPlaylist() {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    const playlistEl = document.getElementById('playlist');
    playlistEl.innerHTML = '';
    playlist.forEach((link, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link;
        a.textContent = link;
        a.target = '_blank';
        li.appendChild(a);
        playlistEl.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayPlaylist);
