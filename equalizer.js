document.addEventListener('DOMContentLoaded', () => {
    console.log("equalizer.js carregado e DOMContentLoaded disparado");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const secondaryAudioPlayer = document.getElementById('secondary-audio-player');

    // Configurar os filtros
    const bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 200;
    bassFilter.gain.value = 0;

    const midFilter = audioContext.createBiquadFilter();
    midFilter.type = 'peaking';
    midFilter.frequency.value = 1000;
    midFilter.Q.value = 1;
    midFilter.gain.value = 0;

    const trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = 0;

    // Funções para ajustar os filtros
    function adjustEqualizer(type, value) {
        switch (type) {
            case 'bass':
                bassFilter.gain.value = value;
                break;
            case 'mid':
                midFilter.gain.value = value;
                break;
            case 'treble':
                trebleFilter.gain.value = value;
                break;
        }
        console.log(`${type} ajustado para ${value}`);
    }

    // Adicionar event listeners aos controles de equalização
document.getElementById('bass').addEventListener('input', (e) => adjustEqualizer('bass', e.target.value));
document.getElementById('mid').addEventListener('input', (e) => adjustEqualizer('mid', e.target.value));
document.getElementById('treble').addEventListener('input', (e) => adjustEqualizer('treble', e.target.value));
document.getElementById('resetEqualizer').addEventListener('click', () => {
    adjustEqualizer('bass', 0);
    adjustEqualizer('mid', 0);
    adjustEqualizer('treble', 0);
    document.getElementById('bass').value = 0;
    document.getElementById('mid').value = 0;
    document.getElementById('treble').value = 0;
});

// Lógica para abrir e fechar o modal do equalizador
const equalizerIcon = document.querySelector('.equalizer-icon');
const equalizerModal = document.getElementById('equalizerModal');
const closeEqualizerModal = document.getElementById('closeEqualizerModal');

equalizerIcon.addEventListener('click', () => {
    console.log("Ícone do equalizador clicado");
    equalizerModal.style.display = 'block';
});

closeEqualizerModal.addEventListener('click', () => {
    console.log("Fechar modal do equalizador clicado");
    equalizerModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === equalizerModal) {
        equalizerModal.style.display = 'none';
    }
});

// Adicionar listeners ao player de áudio local para verificar status e aplicar equalização
secondaryAudioPlayer.addEventListener('play', function() {
    audioContext.resume().then(() => {
        console.log("Audio context resumed para música local");
        const source = audioContext.createMediaElementSource(secondaryAudioPlayer);
        source.connect(bassFilter).connect(midFilter).connect(trebleFilter).connect(audioContext.destination);
        secondaryAudioPlayer.play(); // Garante que o player local toque
    }).catch(error => {
        console.error("Erro ao retomar o contexto de áudio:", error);
    });
});

secondaryAudioPlayer.addEventListener('canplaythrough', () => {
    console.log(`O áudio ${secondaryAudioPlayer.id} pode ser reproduzido`);
});

secondaryAudioPlayer.addEventListener('error', (e) => {
    console.error(`Erro no player ${secondaryAudioPlayer.id}:`, e);
});

secondaryAudioPlayer.addEventListener('pause', function() {
    secondaryAudioPlayer.pause();
});

secondaryAudioPlayer.addEventListener('ended', function() {
    secondaryAudioPlayer.pause(); // Pause no final da reprodução
});
