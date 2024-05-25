document.addEventListener('DOMContentLoaded', () => {
    console.log("equalizer.js carregado e DOMContentLoaded disparado");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Inicialize o Howler com a integração da Web Audio API
    const sound = new Howl({
        src: ['sua-musica.mp3'],
        volume: 1.0,
        html5: true,
        onplay: function() {
            const source = audioContext.createMediaElementSource(sound._sounds[0]._node);

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

            document.getElementById('bass').addEventListener('input', (e) => adjustEqualizer('bass', e.target.value));
            document.getElementById('mid').addEventListener('input', (e) => adjustEqualizer('mid', e.target.value));
            document.getElementById('treble').addEventListener('input', (e) => adjustEqualizer('treble', e.target.value));
            document.getElementById('resetEqualizer').addEventListener('click', () => {
                adjustEqualizer('bass', 0);
                adjustEqualizer('mid', 0);
                adjustEqualizer('treble', 0);
            });
        }
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
    document.getElementById('audio-player').addEventListener('play', function() {
        sound.play();
    });

    document.getElementById('audio-player').addEventListener('pause', function() {
        sound.pause();
    });

    document.getElementById('audio-player').addEventListener('ended', function() {
        sound.stop();
    });

    document.getElementById('volume-control').addEventListener('input', function(e) {
        sound.volume(e.target.value);
    });
});
