document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const source = audioContext.createMediaElementSource(audioPlayer);

    console.log("AudioContext and source created");

    // Conectando diretamente ao contexto de áudio
    source.connect(audioContext.destination);

    console.log("Audio source connected directly to audio context destination");

    // Adicionando listeners para depuração
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
