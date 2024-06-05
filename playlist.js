function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    // Simulando resultados de busca
    const simulatedResults = [
        { title: "Música 1", link: "https://www.example.com/audio1.mp3" },
        { title: "Música 2", link: "https://www.example.com/audio2.mp3" },
        { title: "Música 3", link: "https://www.example.com/audio3.mp3" }
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
        addButton.onclick = () => addToPlaylist(result.title, result.link);
        resultDiv.appendChild(addButton);
        resultsContainer.appendChild(resultDiv);
    });
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

function playAudio(link) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = link;
    audioPlayer.play();
}

document.addEventListener('DOMContentLoaded', displayPlaylist);
