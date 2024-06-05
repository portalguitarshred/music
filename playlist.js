function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    if (!query) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}+music`;
    window.open(url, '_blank');
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
