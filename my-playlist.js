document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const statusMessage = document.createElement('div');
    statusMessage.id = 'status-message';
    document.body.appendChild(statusMessage);
    let currentPlaying = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const stations = [
        { name: 'Rock Station', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
        { name: 'Classic Rock', url: 'https://stream.zeno.fm/amepggt3jxptv' },
        { name: 'Instrumental', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
    ];

    function playStation(station, li) {
        audioPlayer.src = station.url;
        audioPlayer.play();
        if (currentPlaying) {
            currentPlaying.classList.remove('playing');
            currentPlaying.style.backgroundColor = '';
            currentPlaying.querySelector('.play-pause-icon').classList.remove('fa-pause');
            currentPlaying.querySelector('.play-pause-icon').classList.add('fa-play');
            currentPlaying.querySelector('.spectrum').style.display = 'none';
        }
        li.classList.add('playing');
        li.style.backgroundColor = '#05d26d'; // Cor verde padrão
        li.querySelector('.play-pause-icon').classList.remove('fa-play');
        li.querySelector('.play-pause-icon').classList.add('fa-pause');
        li.querySelector('.spectrum').style.display = 'flex';
        currentPlaying = li;
    }

    function pauseStation(li) {
        audioPlayer.pause();
        li.classList.remove('playing');
        li.style.backgroundColor = '';
        li.querySelector('.play-pause-icon').classList.remove('fa-pause');
        li.querySelector('.play-pause-icon').classList.add('fa-play');
        li.querySelector('.spectrum').style.display = 'none';
        currentPlaying = null;
    }

       stations.forEach((station, index) => {
        const li = document.createElement('li');
        li.textContent = station.name;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa', 'fa-heart', 'heart-icon');
        if (favorites.includes(station.url)) {
            heartIcon.classList.add('favorited');
        }
        heartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            heartIcon.classList.toggle('favorited');
            if (heartIcon.classList.contains('favorited')) {
                favorites.push(station.url);
            } else {
                favorites = favorites.filter(fav => fav !== station.url);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
        li.appendChild(heartIcon);

        const playPauseIcon = document.createElement('i');
        playPauseIcon.classList.add('fa', 'fa-play', 'play-pause-icon');
        li.appendChild(playPauseIcon);

        const spectrum = document.createElement('div');
        spectrum.classList.add('spectrum');
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            spectrum.appendChild(bar);
        }
        li.appendChild(spectrum);

        li.addEventListener('click', () => {
            if (li.classList.contains('playing')) {
                pauseStation(li);
            } else {
                playStation(station, li);
            }
        });

        stationList.appendChild(li);
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });

    // Função para abrir e fechar o menu
    function openMenu() {
        console.log("Abrindo menu");
        menu.classList.add('open');
    }

    function closeMenu() {
        console.log("Fechando menu");
        menu.classList.remove('open');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const loginLink = document.getElementById('login-link');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginButton = document.getElementById('loginButton');

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    closeLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginButton.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            const response = await fetch('http://musica.guitarshred.com.br/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email: email,
                    password: password
                })
            });

            const data = await response.text();
            alert(data);

            if (response.ok) {
                loginModal.style.display = 'none';
            } else {
                alert('Erro ao realizar login. Verifique suas credenciais.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    const registerLink = document.getElementById('register-link');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const registerButton = document.getElementById('registerButton');

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
    });

    closeRegisterModal.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    registerButton.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (username && email && password) {
            const response = await fetch('http://musica.guitarshred.com.br/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    email: email,
                    password: password
                })
            });

            const data = await response.text();
            alert(data);

            if (response.ok) {
                registerModal.style.display = 'none';
            } else {
                alert('Erro ao registrar usuário. Tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});

