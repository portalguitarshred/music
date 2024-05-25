// equalizer.js

console.log("equalizer.js foi carregado");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded disparado");

    const equalizerIcon = document.querySelector('.equalizer-icon');
    if (equalizerIcon) {
        console.log("Ícone do equalizador encontrado");
        equalizerIcon.addEventListener('click', () => {
            console.log("Ícone do equalizador clicado");
        });
    } else {
        console.log("Ícone do equalizador não encontrado");
    }

    const equalizerModal = document.getElementById('equalizerModal');
    if (equalizerModal) {
        console.log("Modal do equalizador encontrado");
    } else {
        console.log("Modal do equalizador não encontrado");
    }

    const closeEqualizerModal = document.getElementById('closeEqualizerModal');
    if (closeEqualizerModal) {
        console.log("Botão de fechar modal do equalizador encontrado");
        closeEqualizerModal.addEventListener('click', () => {
            console.log("Botão de fechar modal clicado");
            equalizerModal.style.display = 'none';
        });
    } else {
        console.log("Botão de fechar modal do equalizador não encontrado");
    }

    const bassControl = document.getElementById('bass');
    if (bassControl) {
        console.log("Controle de graves encontrado");
        bassControl.addEventListener('input', (e) => {
            console.log(`Bass control input: ${e.target.value}`);
        });
    } else {
        console.log("Controle de graves não encontrado");
    }

    const midControl = document.getElementById('mid');
    if (midControl) {
        console.log("Controle de médios encontrado");
        midControl.addEventListener('input', (e) => {
            console.log(`Mid control input: ${e.target.value}`);
        });
    } else {
        console.log("Controle de médios não encontrado");
    }

    const trebleControl = document.getElementById('treble');
    if (trebleControl) {
        console.log("Controle de agudos encontrado");
        trebleControl.addEventListener('input', (e) => {
            console.log(`Treble control input: ${e.target.value}`);
        });
    } else {
        console.log("Controle de agudos não encontrado");
    }

    const resetEqualizerButton = document.getElementById('resetEqualizer');
    if (resetEqualizerButton) {
        console.log("Botão de resetar equalizador encontrado");
        resetEqualizerButton.addEventListener('click', () => {
            console.log("Botão de resetar equalizador clicado");
            bassControl.value = 0;
            midControl.value = 0;
            trebleControl.value = 0;
        });
    } else {
        console.log("Botão de resetar equalizador não encontrado");
    }
});
