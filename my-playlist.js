// my-playlist.js

document.addEventListener('DOMContentLoaded', () => {
    const playlistGridContainer = document.querySelector('.playlist-grid-container');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    let currentPlaying = null;

    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    playlists.forEach((playlist, index) => {
        const gridItem = document.querySelector(`.playlist-grid-item:nth-child(${index + 1})`);

        if (gridItem) {
            const img = document.createElement('img');
            img.src = playlist.cover || 'default-cover.png'; // Use a imagem da capa ou uma imagem padrão
            img.alt = `Playlist ${index + 1}`;
            gridItem.innerHTML = ''; // Limpa qualquer conteúdo anterior
            gridItem.appendChild(img);
            
            gridItem.addEventListener('click', () => {
                sessionStorage.setItem('playlistCover', playlist.cover);
                sessionStorage.setItem('playlistName', playlist.name);
                sessionStorage.setItem('playlistSongs', JSON.stringify(playlist.songs));
                sessionStorage.setItem('playlistSongNames', JSON.stringify(playlist.songNames));
                window.location.href = 'user-playlist.html';
            });
        }
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('open');
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });
});
