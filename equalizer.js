document.addEventListener('DOMContentLoaded', () => {
    console.log("equalizer.js carregado e DOMContentLoaded disparado");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const secondaryAudioPlayer = document.getElementById('secondary-audio-player');

    // Crie as fontes de áudio
    const source = audioContext.createMediaElementSource(audioPlayer);
    const secondarySource = audioContext.createMediaElementSource(secondaryAudioPlayer);

    // Crie os nós de filtro
    const bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.setValueAtTime(200, audioContext.currentTime);
    bassFilter.gain.setValueAtTime(0, audioContext.currentTime);

    const midFilter = audioContext.createBiquadFilter();
    midFilter.type = 'peaking';
    midFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
    midFilter.Q.setValueAtTime(1, audioContext.currentTime);
    midFilter.gain.setValueAtTime(0, audioContext.currentTime);

    const trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.setValueAtTime(3000, audioContext.currentTime);
    trebleFilter.gain.setValueAtTime(0, audioContext.currentTime);

    // Conecte os nós na cadeia de áudio
    source.connect(bassFilter);
    secondarySource.connect(bassFilter);
    bassFilter.connect(midFilter);
    midFilter.connect(trebleFilter);
    trebleFilter.connect(audioContext.destination);

    // Funções para ajustar os filtros
    function adjustEqualizer(type, value) {
        switch (type) {
            case 'bass':
                bassFilter.gain.setValueAtTime(value, audioContext.currentTime);
                break;
            case 'mid':
                midFilter.gain.setValueAtTime(value, audioContext.currentTime);
                break;
            case 'treble':
                trebleFilter.gain.setValueAtTime(value, audioContext.currentTime);
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

    // Adicionar listeners aos players de áudio para verificar status e garantir que o áudio seja liberado para tocar
    [audioPlayer, secondaryAudioPlayer].forEach(player => {
        player.addEventListener('play', function() {
            audioContext.resume().then(() => {
                console.log("Audio context resumed");
            }).catch(error => {
                console.error("Erro ao retomar o contexto de áudio:", error);
            });
        });

        player.addEventListener('canplaythrough', () => {
            console.log(`O áudio ${player.id} pode ser reproduzido`);
        });

        player.addEventListener('error', (e) => {
            console.error(`Erro no player ${player.id}:`, e);
        });
    });
});
