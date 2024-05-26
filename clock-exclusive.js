document.addEventListener('DOMContentLoaded', () => {
    const clockIcon = document.getElementById('clock-icon-exclusive');
    const timerModal = document.getElementById('timer-modal-exclusive');
    const closeModal = document.getElementById('close-modal-exclusive');
    const setTimerButton = document.getElementById('set-timer-button-exclusive');
    const timerInput = document.getElementById('timer-input-exclusive');

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
    clockIcon.addEventListener('click', openTimerModal);

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
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            alert('O temporizador desligou a rádio.');
        }, milliseconds);

        closeTimerModal();
        alert(`Temporizador definido para ${minutes} minutos.`);
    });
});
