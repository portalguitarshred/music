// equalizer.js

document.addEventListener('DOMContentLoaded', () => {
    const equalizerIcon = document.querySelector('.equalizer-icon');
    const equalizerModal = document.getElementById('equalizerModal');
    const closeEqualizerModal = document.getElementById('closeEqualizerModal');

    equalizerIcon.addEventListener('click', () => {
        equalizerModal.style.display = 'block';
    });

    closeEqualizerModal.addEventListener('click', () => {
        equalizerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === equalizerModal) {
            equalizerModal.style.display = 'none';
        }
    });

    const bassControl = document.getElementById('bass');
    const midControl = document.getElementById('mid');
    const trebleControl = document.getElementById('treble');

    bassControl.addEventListener('input', (e) => {
        adjustEqualizer('bass', e.target.value);
    });

    midControl.addEventListener('input', (e) => {
        adjustEqualizer('mid', e.target.value);
    });

    trebleControl.addEventListener('input', (e) => {
        adjustEqualizer('treble', e.target.value);
    });

    document.getElementById('resetEqualizer').addEventListener('click', () => {
        bassControl.value = 0;
        midControl.value = 0;
        trebleControl.value = 0;
        adjustEqualizer('bass', 0);
        adjustEqualizer('mid', 0);
        adjustEqualizer('treble', 0);
    });

    function adjustEqualizer(type, value) {
        console.log(`${type} set to ${value}`);
        // Implementar lógica para ajustar o equalizador
    }
});
