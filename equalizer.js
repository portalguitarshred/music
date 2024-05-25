document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const source = audioContext.createMediaElementSource(audioPlayer);

    const bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 200;
    bassFilter.gain.value = 0;

    const midFilter = audioContext.createBiquadFilter();
    midFilter.type = 'peaking';
    midFilter.frequency.value = 1000;
    midFilter.gain.value = 0;

    source.connect(bassFilter);
    bassFilter.connect(midFilter);
    midFilter.connect(audioContext.destination);

    document.getElementById('bass').addEventListener('input', (e) => {
        bassFilter.gain.value = e.target.value;
    });

    document.getElementById('mid').addEventListener('input', (e) => {
        midFilter.gain.value = e.target.value;
    });
});
