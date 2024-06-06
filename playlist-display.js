document.addEventListener('DOMContentLoaded', () => {
    const playlistTitleElement = document.getElementById('playlist-title'); // Novo elemento para o título da playlist

    if (playlistTitleElement) {
        const playlistTitle = sessionStorage.getItem('playlistTitle');
        console.log("Tentando carregar o título da playlist:", playlistTitle); // Verificar o título da playlist
        if (playlistTitle) {
            console.log("Título encontrado. Atualizando o texto do elemento.");
            playlistTitleElement.textContent = playlistTitle;
        } else {
            console.log("Nenhum título de playlist encontrado no sessionStorage.");
        }
    }
});
