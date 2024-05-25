document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const source = audioContext.createMediaElementSource(audioPlayer);

    console.log("AudioContext and source created");

    // Create the filters
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

    console.log("Filters created");

    // Connect the filters
    source.connect(bassFilter);
    bassFilter.connect(midFilter);
    midFilter.connect(trebleFilter);
    trebleFilter.connect(audioContext.destination);

    console.log("Filters connected");

    // Add event listeners for the sliders
    document.getElementById('bass').addEventListener('input', (e) => {
        bassFilter.gain.value = e.target.value;
        console.log(`Bass set to ${e.target.value}`);
    });

    document.getElementById('mid').addEventListener('input', (e) => {
        midFilter.gain.value = e.target.value;
        console.log(`Mid set to ${e.target.value}`);
    });

    document.getElementById('treble').addEventListener('input', (e) => {
        trebleFilter.gain.value = e.target.value;
        console.log(`Treble set to ${e.target.value}`);
    });

    document.getElementById('resetEqualizer').addEventListener('click', () => {
        bassFilter.gain.value = 0;
        midFilter.gain.value = 0;
        trebleFilter.gain.value = 0;
        document.getElementById('bass').value = 0;
        document.getElementById('mid').value = 0;
        document.getElementById('treble').value = 0;
        console.log('Equalizer reset');
    });

    // Add event listeners to check the audio player's state
    audioPlayer.addEventListener('play', () => {
        console.log("Audio is playing");
    });

    audioPlayer.addEventListener('pause', () => {
        console.log("Audio is paused");
    });

    audioPlayer.addEventListener('ended', () => {
        console.log("Audio playback ended");
    });

    audioPlayer.addEventListener('error', (e) => {
        console.log("Audio playback error:", e);
    });
});
