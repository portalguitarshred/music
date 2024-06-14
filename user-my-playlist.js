<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minhas Playlists</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="my-playlist-styles.css">
</head>
<body>
    <header>
        <i class="fas fa-bars menu-toggle-my-playlist"></i>
        <a href="https://portalguitarshred.github.io/music/radio.html">
            <img src="logo1.png" alt="Guitar Radio Logo" class="logo">
        </a>
        <span class="clock-icon-exclusive" id="clock-icon-exclusive">&#128339;</span>
        <nav class="menu-my-playlist">
            <img src="logo2.png" alt="Guitar Radio Logo" class="logo2">
            <hr class="menu-divider">
            <a href="#" id="login-link"><i class="fas fa-sign-in-alt"></i> Login</a>
            <a href="#" id="register-link"><i class="fas fa-user"></i> Registro</a>
            <hr class="menu-divider">
            <a href="#" id="timer-link"><i class="fas fa-clock"></i> Temporizador</a>
            <a href="#" id="create-playlist-link"><i class="fas fa-plus"></i> Criar Playlist</a>
            <a href="#" id="equalizer-link"><i class="fas fa-sliders-h"></i> Equalizador</a>
            <a href="#" id="my-playlists-link"><i class="fas fa-music"></i> Minhas Playlists</a>
            <a href="#" id="share-link"><i class="fas fa-share-alt"></i> Compartilhar com amigos</a>
            <a href="https://guitarshred.com.br" target="_blank"><i class="fas fa-newspaper"></i> Notícias</a>
            <a href="https://guitarshredacademy.com.br" target="_blank"><i class="fas fa-guitar"></i> Cursos de Guitarra</a>
            <a href="https://www.youtube.com/guitarshredofficial" target="_blank"><i class="fab fa-youtube"></i> Canal do YouTube</a>
            <a href="https://www.instagram.com/portalguitarshred" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
        </nav>
    </header>

    <div class="playlist-grid-container">
        <!-- Espaços reservados para as playlists -->
        <div class="playlist-grid-item"><img src="default-cover.png" alt="Espaço 1"></div>
        <div class="playlist-grid-item"><img src="default-cover.png" alt="Espaço 2"></div>
        <div class="playlist-grid-item"><img src="default-cover.png" alt="Espaço 3"></div>
        <div class="playlist-grid-item"><img src="default-cover.png" alt="Espaço 4"></div>
        <div class="playlist-grid-item"><img src="default-cover.png" alt="Espaço 5"></div>
        <div class="playlist-grid-item"><img src="default-cover.png" alt="Espaço 6"></div>
    </div>

    <main>
        <section id="stations">
            <ul id="station-list">
                <!-- Stations will be dynamically added here -->
            </ul>
        </section>
        <section id="player">
            <audio id="audio-player" controls>
                Your browser does not support the audio element.
            </audio>
            <div id="volume-container">
                <label for="volume-control">Volume:</label>
                <input type="range" id="volume-control" min="0" max="1" step="0.01" value="1">
            </div>
        </section>
    </main>

    <!-- Modal para a programação do temporizador -->
    <div id="timer-modal-exclusive" class="modal-exclusive">
        <div class="modal-content-exclusive">
            <span class="close-modal-exclusive" id="close-modal-exclusive">&times;</span>
            <h3>Hora de dormir</h3>
            <label for="timer-input-exclusive">Desligar após (minutos):</label>
            <input type="number" id="timer-input-exclusive" min="1" max="120" value="30">
            <button class="set-timer-button-exclusive" id="set-timer-button-exclusive">Definir o tempo</button>
        </div>
    </div>

    <!-- Modal para opções de compartilhamento -->
    <div id="shareModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeShareModal">&times;</span>
            <h3>Compartilhar estação</h3>
            <div class="share-options">
                <button id="copyLink">Copiar link</button>
                <button id="shareFacebook">Compartilhar no Facebook</button>
                <button id="shareTwitter">Compartilhar no Twitter</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="equalizer.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/howler@2.2.3/dist/howler.min.js"></script>
    <script src="clock-exclusive.js"></script>
    <script src="menu-my-playlist.js"></script>
    <script src="user-my-playlist.js"></script>
</body>
</html>
