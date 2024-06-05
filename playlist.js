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
        addButton.onclick = () => addToPlaylist(result.title, convertToAudioLink(result.link));
        resultDiv.appendChild(addButton);
        resultsContainer.appendChild(resultDiv);
    });
}

function convertToAudioLink(youtubeLink) {
    // Simulando a conversão de um link de YouTube para um link de áudio
    // Em uma aplicação real, você precisaria de um serviço que converta o vídeo do YouTube para um formato de áudio.
    return youtubeLink.replace("youtube.com/watch?v=", "example.com/audio/"); 
}

function addMusic() {
    const musicUrl = document.getElementById('musicUrl').value;
    if (!musicUrl) return;

    const musicTitle = "User Added"; // Título padrão para músicas adicionadas manualmente
    addToPlaylist(musicTitle, musicUrl);
    document.getElementById('musicUrl').value = ''; // Limpar o campo após adicionar
}

function addToPlaylist(title, link) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    playlist.push({ title, link });
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displayPlaylist();
}

function displayPlaylist() {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    const playlistEl = document.getElementById('playlist');
    playlistEl.innerHTML = '';
    playlist.forEach((item, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = `${item.title} (Áudio)`;
        a.target = '_blank';
        li.appendChild(a);
        playlistEl.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayPlaylist);
