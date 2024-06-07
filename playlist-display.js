document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistTitleElem = document.getElementById('playlist-title'); // Novo elemento para o título

    // Exibir a capa da playlist
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

    // Exibir o título da playlist
    if (playlistTitleElem) {
        const playlistTitle = sessionStorage.getItem('playlistTitle');
        console.log("Tentando carregar o título da playlist:", playlistTitle);
        if (playlistTitle) {
            console.log("Título encontrado. Atualizando o texto do elemento.");
            playlistTitleElem.textContent = playlistTitle;
        } else {
            console.log("Nenhum título de playlist encontrado no sessionStorage.");
        }
    }
});
