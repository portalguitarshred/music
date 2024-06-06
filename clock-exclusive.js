document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado e analisado');
    
    const clockIcon = document.getElementById('clock-icon-exclusive');
    const timerModal = document.getElementById('timer-modal-exclusive');
    const closeModal = document.getElementById('close-modal-exclusive');
    const setTimerButton = document.getElementById('set-timer-button-exclusive');
    const timerInput = document.getElementById('timer-input-exclusive');
    const timerLink = document.getElementById('timer-link');

    // Verificação dos elementos
    console.log('clockIcon:', clockIcon);
    console.log('timerModal:', timerModal);
    console.log('closeModal:', closeModal);
    console.log('setTimerButton:', setTimerButton);
    console.log('timerInput:', timerInput);
    console.log('timerLink:', timerLink);

    // Função para abrir o modal do temporizador
    function openTimerModal() {
        console.log('Abrindo modal do temporizador');
        timerModal.style.display = 'block';
    }

    // Função para fechar o modal do temporizador
    function closeTimerModal() {
        console.log('Fechando modal do temporizador');
        timerModal.style.display = 'none';
    }

    // Adiciona eventos de clique ao ícone do relógio
    clockIcon.addEventListener('click', () => {
        console.log('Ícone do relógio clicado');
        openTimerModal();
    });

    // Adiciona eventos de clique ao link do temporizador no menu sanduíche
    timerLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Link do temporizador clicado');
        openTimerModal();
    });

    // Adiciona eventos de clique ao botão de fechar o modal
    closeModal.addEventListener('click', closeTimerModal);

    // Adiciona eventos de clique à janela para fechar o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === timerModal) {
            closeTimerModal();
        }
    });

    // Adiciona evento de clique ao botão de definir o temporizador
    setTimerButton.addEventListener('click', () => {
        const minutes = parseInt(timerInput.value, 10);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Por favor, insira um valor válido de minutos.');
            return;
        }

        const milliseconds = minutes * 60 * 1000;
        setTimeout(() => {
            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            alert('O temporizador desligou a rádio.');
        }, milliseconds);

        closeTimerModal();
        alert(`Temporizador definido para ${minutes} minutos.`);
    });
});
