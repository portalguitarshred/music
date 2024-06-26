(function() {
    function playAudio(url) {
        console.log("Iniciando reprodução de áudio:", url);
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }
        window.currentAudio = new Audio(url);
        window.currentAudio.play().then(() => {
            console.log("Reproduzindo áudio:", url);
        }).catch(error => {
            console.error('Erro ao tentar reproduzir o áudio:', error);
        });
    }

    window.playAudio = playAudio;
})();
