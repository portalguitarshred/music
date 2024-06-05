// Substitua 'YOUR_SOUNDCLOUD_CLIENT_ID' pela sua chave da API do SoundCloud
const SOUNDCLOUD_CLIENT_ID = 'YOUR_SOUNDCLOUD_CLIENT_ID';

function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    fetch(`https://api.soundcloud.com/tracks?q=${query}&client_id=${SOUNDCLOUD_CLIENT_ID}`)
        .then(response => response.json())
        .then(data => displayResults(data))
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
        addButton.onclick = () => addToPlaylist(result.title, result.id);
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

function addToPlaylist(title, trackId) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    playlist.push({ title, trackId });
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
            playAudio(item.trackId);
        };
        li.appendChild(a);
        playlistEl.appendChild(li);
    });
}

function playAudio(trackId) {
    fetch(`https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${SOUNDCLOUD_CLIENT_ID}`)
        .then(response => {
            if (response.ok) {
                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = response.url;
                audioPlayer.play();
            } else {
                console.error('Erro ao obter link de áudio:', response.statusText);
            }
        })
        .catch(error => console.error('Erro ao obter link de áudio:', error));
}

document.addEventListener('DOMContentLoaded', displayPlaylist);
