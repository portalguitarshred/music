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

    async function adjustEqualizer(type, value) {
        console.log(`Adjusting ${type} to ${value}`); // Log para verificar o valor a ser ajustado
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
                console.log(`${type} ajustado para ${value}`, responseData); // Log para verificar a resposta da API
            } else {
                console.error(`Erro ao ajustar ${type}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro na requisição para ajustar ${type}:`, error);
        }
    }
});
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

    async function adjustEqualizer(type, value) {
        console.log(`Adjusting ${type} to ${value}`); // Log para verificar o valor a ser ajustado
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
                console.log(`${type} ajustado para ${value}`, responseData); // Log para verificar a resposta da API
            } else {
                console.error(`Erro ao ajustar ${type}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Erro na requisição para ajustar ${type}:`, error);
        }
    }
});
