// equalizer.js

console.log("equalizer.js foi carregado");

document.addEventListener('DOMContentLoaded', () => {
    console.log("equalizer.js carregado e DOMContentLoaded disparado");

    const equalizerIcon = document.querySelector('.equalizer-icon');
    const equalizerModal = document.getElementById('equalizerModal');
    const closeEqualizerModal = document.getElementById('closeEqualizerModal');

    if (equalizerIcon) {
        console.log("Ícone do equalizador encontrado");
        equalizerIcon.addEventListener('click', () => {
            console.log("Ícone do equalizador clicado");
            equalizerModal.style.display = 'block';
        });
    } else {
        console.log("Ícone do equalizador não encontrado");
    }

    if (closeEqualizerModal) {
        console.log("Botão de fechar modal do equalizador encontrado");
        closeEqualizerModal.addEventListener('click', () => {
            console.log("Fechar modal do equalizador clicado");
            equalizerModal.style.display = 'none';
        });
    } else {
        console.log("Botão de fechar modal do equalizador não encontrado");
    }

    window.addEventListener('click', (event) => {
        if (event.target === equalizerModal) {
            equalizerModal.style.display = 'none';
        }
    });

    const bassControl = document.getElementById('bass');
    const midControl = document.getElementById('mid');
    const trebleControl = document.getElementById('treble');

    if (bassControl) {
        console.log("Controle de graves encontrado");
        bassControl.addEventListener('input', (e) => {
            console.log(`Bass control input: ${e.target.value}`);
            adjustEqualizer('bass', e.target.value);
        });
    } else {
        console.log("Controle de graves não encontrado");
    }

    if (midControl) {
        console.log("Controle de médios encontrado");
        midControl.addEventListener('input', (e) => {
            console.log(`Mid control input: ${e.target.value}`);
            adjustEqualizer('mid', e.target.value);
        });
    } else {
        console.log("Controle de médios não encontrado");
    }

    if (trebleControl) {
        console.log("Controle de agudos encontrado");
        trebleControl.addEventListener('input', (e) => {
            console.log(`Treble control input: ${e.target.value}`);
            adjustEqualizer('treble', e.target.value);
        });
    } else {
        console.log("Controle de agudos não encontrado");
    }

    const resetEqualizerButton = document.getElementById('resetEqualizer');
    if (resetEqualizerButton) {
        console.log("Botão de resetar equalizador encontrado");
        resetEqualizerButton.addEventListener('click', () => {
            bassControl.value = 0;
            midControl.value = 0;
            trebleControl.value = 0;
            adjustEqualizer('bass', 0);
            adjustEqualizer('mid', 0);
            adjustEqualizer('treble', 0);
        });
    } else {
        console.log("Botão de resetar equalizador não encontrado");
    }

    async function adjustEqualizer(type, value) {
        console.log(`Adjusting ${type} to ${value}`);
        try {
            const response = await fetch(`https://suaapi.com/equalizer/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: value })
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(`${type} ajustado para ${value}`, responseData);
            } else {
                console.error(`Erro ao ajustar ${type}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro na requisição para ajustar ${type}:`, error);
        }
    }
});
