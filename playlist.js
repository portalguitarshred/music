function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    // Simulando resultados de busca
    const simulatedResults = [
        { title: "Música 1", link: "https://www.youtube.com/watch?v=xxxxxx1" },
        { title: "Música 2", link: "https://www.youtube.com/watch?v=xxxxxx2" },
        { title: "Música 3", link: "https://www.youtube.com/watch?v=xxxxxx3" }
    ];

    displayResults(simulatedResults);
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

function addMusic() {
    const musicUrl = document.getElementById('musicUrl').value;
    if (!musicUrl) return;

    addToPlaylist(musicUrl);
    document.getElementById('musicUrl').value = ''; // Limpar o campo após adicionar
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
        a.textContent = getFriendlyName(link);
        a.target = '_blank';
        li.appendChild(a);
        playlistEl.appendChild(li);
    });
}

function getFriendlyName(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname + ' - ' + urlObj.pathname.split('/').pop();
    } catch (error) {
        return url;
    }
}

document.addEventListener('DOMContentLoaded', displayPlaylist);
