document.addEventListener('DOMContentLoaded', () => {
    const playlistCoverImg = document.getElementById('playlist-cover');
    const playlistNameTitle = document.getElementById('playlist-name'); // Novo elemento para o título da playlist

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

    if (playlistNameTitle) {
        const playlistName = sessionStorage.getItem('playlistName');
        console.log("Tentando carregar o nome da playlist:", playlistName);
        if (playlistName) {
            console.log("Nome da playlist encontrado. Atualizando o título.");
            playlistNameTitle.textContent = playlistName;
        } else {
            console.log("Nenhum nome de playlist encontrado no sessionStorage.");
        }
    }
});
