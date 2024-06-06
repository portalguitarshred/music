document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElement = document.getElementById('playlist-title');

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

    if (playlistTitleElement) {
        const playlistTitle = sessionStorage.getItem('playlistTitle');
        console.log("Tentando carregar o título da playlist:", playlistTitle);
        if (playlistTitle) {
            console.log("Título encontrado. Atualizando o texto do elemento.");
            playlistTitleElement.textContent = playlistTitle;
        } else {
            console.log("Nenhum título de playlist encontrado no sessionStorage.");
        }
    }
});
