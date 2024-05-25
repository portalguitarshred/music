document.addEventListener('DOMContentLoaded', () => {
    const stationList = document.getElementById('station-list');
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const statusMessage = document.createElement('div'); // Elemento para mensagens de status
    statusMessage.id = 'status-message';
    document.body.appendChild(statusMessage); // Adiciona o elemento de status ao corpo do documento
    let currentPlaying = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Carrega favoritos do localStorage

    const stations = [
        { name: 'Rock Station', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
        { name: 'Classic Rock', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
        { name: 'Guitar Instrumental', url: 'https://stream.zeno.fm/qupiusi3w5puv' },
    ];

    stations.forEach(station => {
    const li = document.createElement('li');
    li.textContent = station.name;

    // Adiciona ícone de coração
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

    // Adiciona ícone de compartilhamento
    const shareIcon = document.createElement('i');
    shareIcon.classList.add('fa', 'fa-share-alt', 'share-icon');
    shareIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareModal(station.url);
    });
    li.appendChild(shareIcon);

    // Lógica do Carrossel Touch

       document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider__button--right');
    const prevButton = document.querySelector('.slider__button--left');
    const dotsNav = document.querySelector('.slider__nav');
    const dots = Array.from(dotsNav.children);
    const audioPlayer = document.getElementById('audio-player');

    let slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        audioPlayer.src = targetSlide.dataset.url;
        audioPlayer.play();
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });

    // Suporte para eventos de toque
    let startX;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const moveX = e.touches[0].clientX - startX;
        track.style.transform = `translateX(${moveX}px)`;
    });

    track.addEventListener('touchend', e => {
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const moveX = endX - startX;

        const currentSlide = track.querySelector('.current-slide');
        let targetSlide;

        if (moveX < -50 && currentSlide.nextElementSibling) {
            targetSlide = currentSlide.nextElementSibling;
        } else if (moveX > 50 && currentSlide.previousElementSibling) {
            targetSlide = currentSlide.previousElementSibling;
        } else {
            targetSlide = currentSlide;
        }

        moveToSlide(track, currentSlide, targetSlide);
    });

    // Reajustar a largura do slide quando a janela é redimensionada
    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach(setSlidePosition);
        const currentSlide = track.querySelector('.current-slide');
        track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    });
});
        
    // Adiciona barras do espectro de áudio
    const spectrum = document.createElement('div');
    spectrum.classList.add('spectrum');
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        spectrum.appendChild(bar);
    }
    li.appendChild(spectrum);

    li.addEventListener('click', () => {
        console.log(`Playing: ${station.name} - URL: ${station.url}`);
        audioPlayer.src = station.url;
        statusMessage.textContent = 'Carregando...'; // Mensagem de carregamento
        statusMessage.classList.add('show'); // Mostrar mensagem de status

        audioPlayer.play().then(() => {
            statusMessage.textContent = ''; // Limpa a mensagem de carregamento
            statusMessage.classList.remove('show'); // Esconde a mensagem de status
        }).catch(error => {
            console.error('Playback failed', error);
            statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.'; // Mensagem de erro
        });

        audioPlayer.oncanplay = () => {
            statusMessage.textContent = ''; // Limpa a mensagem de carregamento
            statusMessage.classList.remove('show'); // Esconde a mensagem de status
        };

        audioPlayer.onerror = () => {
            statusMessage.textContent = 'Erro ao carregar a estação. Tente novamente.'; // Mensagem de erro
        };

        if (currentPlaying) {
            currentPlaying.classList.remove('playing'); // Remove a classe 'playing' da estação anterior
        }
        li.classList.add('playing'); // Adiciona a classe 'playing' à estação atual
        currentPlaying = li; // Atualiza a estação atual
    });

    stationList.appendChild(li);
});

    // Controle de volume
    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
        console.log(`Volume: ${audioPlayer.volume}`);
    });

    // Lógica do Temporizador
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
            audioPlayer.currentTime = 0; // Reinicia o áudio
            alert('O temporizador desligou a rádio.');
        }, milliseconds);

        timerModal.style.display = 'none';
        alert(`Temporizador definido para ${minutes} minutos.`);
    });

    // Lógica do Compartilhamento
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

    // Lógica do Menu Sanduíche
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

    // Lógica do Login de Usuário
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

    // Lógica do Registro de Usuário
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
