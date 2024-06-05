function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}+music`;
    window.open(url, '_blank');
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
