document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado e equalizer.js inicializado");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const source = audioContext.createMediaElementSource(audioPlayer);

    console.log("AudioContext e fonte de áudio criados");

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

    // Conectar os filtros em sequência
    source.connect(bassFilter).connect(midFilter).connect(trebleFilter).connect(audioContext.destination);
    console.log("Filtros conectados em sequência");

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

    // Event listeners para os controles do equalizador
    document.getElementById('bass').addEventListener('input', (e) => adjustEqualizer('bass', e.target.value));
    document.getElementById('mid').addEventListener('input', (e) => adjustEqualizer('mid', e.target.value));
    document.getElementById('treble').addEventListener('input', (e) => adjustEqualizer('treble', e.target.value));
    document.getElementById('resetEqualizer').addEventListener('click', () => {
        adjustEqualizer('bass', 0);
        adjustEqualizer('mid', 0);
        adjustEqualizer('treble', 0);
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

    // Adicionar listeners ao player de áudio para verificar status
    audioPlayer.addEventListener('play', () => {
        console.log("Áudio está tocando");
    });

    audioPlayer.addEventListener('pause', () => {
        console.log("Áudio foi pausado");
    });

    audioPlayer.addEventListener('ended', () => {
        console.log("Reprodução do áudio terminou");
    });

    audioPlayer.addEventListener('error', (e) => {
        console.log("Erro na reprodução do áudio:", e);
    });
});
