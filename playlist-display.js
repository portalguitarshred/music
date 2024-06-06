document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');

    if (playlistCoverImg) {
        const coverUrl = sessionStorage.getItem('playlistCover');
        console.log("Tentando carregar a capa da playlist:", coverUrl);
        if (coverUrl) {
            console.log("Capa encontrada. Atualizando o src da imagem.");
            playlistCoverImg.src = coverUrl;
        } else {
            console.log("Nenhuma capa de playlist encontrada no sessionStorage.");
        }
    }
});
