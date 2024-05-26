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
        { name: 'Classic Rock', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
        { name: 'Guitar Instrumental', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
    ];

    function playStation(station, li) {
        audioPlayer.src = station.url;
        audioPlayer.play();
        if (currentPlaying) {
            currentPlaying.classList.remove('playing');
            currentPlaying.style.backgroundColor = '';
        }
        li.classList.add('playing');
        li.style.backgroundColor = '#05d26d'; // Cor verde padrão
        currentPlaying = li;

        // Atualizar o swiper para a estação selecionada
        swiper.slideTo([...stationList.children].indexOf(li));

        // Adiciona o falso espectro de áudio
        const spectrums = document.querySelectorAll('.spectrum');
        spectrums.forEach(spectrum => {
            spectrum.style.display = 'none';
        });
        li.querySelector('.spectrum').style.display = 'flex';
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

        const shareIcon = document.createElement('i');
        shareIcon.classList.add('fa', 'fa-share-alt', 'share-icon');
        shareIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openShareModal(station.url);
        });
        li.appendChild(shareIcon);

        const spectrum = document.createElement('div');
        spectrum.classList.add('spectrum');
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            spectrum.appendChild(bar);
        }
        li.appendChild(spectrum);

        li.addEventListener('click', () => {
            playStation(station, li);
        });

        stationList.appendChild(li);
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });

    const clockIcon = document.getElementById('clock-icon');
    const timerModal = document.getElementById('timerModal');
    const closeModal = document.getElementById('closeModal');
    const setTimerButton = document.getElementById('setTimer');
    const timerInput = document.getElementById('timer');

    clockIcon.addEventListener('click', () => {
        timerModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        timerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === timerModal) {
            timerModal.style.display = 'none';
        }
    });

    setTimerButton.addEventListener('click', () => {
        const minutes = parseInt(timerInput.value, 10);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Por favor, insira um valor válido de minutos.');
            return;
        }

        const milliseconds = minutes * 60 * 1000;
        setTimeout(() => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            alert('O temporizador desligou a rádio.');
        }, milliseconds);

        timerModal.style.display = 'none';
        alert(`Temporizador definido para ${minutes} minutos.`);
    });

    const shareModal = document.getElementById('shareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const copyLinkButton = document.getElementById('copyLink');
    const shareFacebookButton = document.getElementById('shareFacebook');
    const shareTwitterButton = document.getElementById('shareTwitter');
    let currentShareUrl = '';

    closeShareModal.addEventListener('click', () => {
        shareModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });

    function openShareModal(url) {
        currentShareUrl = url;
        shareModal.style.display = 'block';
    }

    copyLinkButton.addEventListener('click', () => {
        navigator.clipboard.writeText(currentShareUrl).then(() => {
            alert('Link copiado para a área de transferência.');
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
        });
    });

    shareFacebookButton.addEventListener('click', () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`;
        window.open(facebookUrl, '_blank');
    });

    shareTwitterButton.addEventListener('click', () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentShareUrl)}`;
        window.open(twitterUrl, '_blank');
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        const isClickInside = menu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside) {
            menu.style.display = 'none';
        }
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
                // Aqui você pode salvar o token JWT ou outra informação de autenticação
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

    // Inicializa o Swiper
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                const activeSlide = swiper.slides[swiper.activeIndex];
                const stationIndex = activeSlide.dataset.index;
                const station = stations[stationIndex];
                playStation(station, document.querySelectorAll('#station-list li')[stationIndex]);
            },
        },
    });

    // Atualiza as capas do slider
    const updateSlider = () => {
        document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
            slide.dataset.index = index;
            slide.dataset.url = stations[index].url;
        });
    };

    updateSlider();
});
