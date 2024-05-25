document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const source = audioContext.createMediaElementSource(audioPlayer);

    console.log("Contexto de áudio e fonte criados");

    // Criação dos filtros
    const bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 200;
    bassFilter.gain.value = 0;

    const midFilter = audioContext.createBiquadFilter();
    midFilter.type = 'peaking';
    midFilter.frequency.value = 1000;
    midFilter.gain.value = 0;

    const trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = 0;

    console.log("Filtros de equalização criados");

    // Conexão dos filtros na cadeia de áudio
    source.connect(bassFilter);
    bassFilter.connect(midFilter);
    midFilter.connect(trebleFilter);
    trebleFilter.connect(audioContext.destination);

    console.log("Filtros conectados na cadeia de áudio");

    // Controle dos filtros
    document.getElementById('bass').addEventListener('input', (e) => {
        bassFilter.gain.value = e.target.value;
        console.log(`Graves ajustados para: ${e.target.value}`);
    });

    document.getElementById('mid').addEventListener('input', (e) => {
        midFilter.gain.value = e.target.value;
        console.log(`Médios ajustados para: ${e.target.value}`);
    });

    document.getElementById('treble').addEventListener('input', (e) => {
        trebleFilter.gain.value = e.target.value;
        console.log(`Agudos ajustados para: ${e.target.value}`);
    });

    document.getElementById('resetEqualizer').addEventListener('click', () => {
        bassFilter.gain.value = 0;
        midFilter.gain.value = 0;
        trebleFilter.gain.value = 0;
        document.getElementById('bass').value = 0;
        document.getElementById('mid').value = 0;
        document.getElementById('treble').value = 0;
        console.log('Equalizador resetado');
    });

    // Inicialização do player para verificar se o áudio está carregado
    audioPlayer.addEventListener('play', () => {
        console.log("Áudio está sendo reproduzido");
    });

    audioPlayer.addEventListener('pause', () => {
        console.log("Áudio foi pausado");
    });

    audioPlayer.addEventListener('ended', () => {
        console.log("Áudio terminou");
    });

    audioPlayer.addEventListener('error', (e) => {
        console.log("Erro no player de áudio:", e);
    });
});
