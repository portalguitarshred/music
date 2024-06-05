import JellyfinClient from 'jellyfin-apiclient';

// Configurações do servidor Jellyfin
const serverAddress = 'http://localhost:8096/web/#/home.html'; // URL do seu servidor Jellyfin
const username = 'wagnerribeiro'; // Seu nome de usuário Jellyfin
const password = '1607wcr77'; // Sua senha Jellyfin
const apiKey = '972a939ef38b43d384eb0a190f68fe67'; // Sua chave de API Jellyfin

const client = new JellyfinClient();

async function initializeClient() {
    try {
        await client.connectToServer(serverAddress);
        const authResult = await client.authenticateUserByName(username, password);
        if (authResult.AccessToken) {
            console.log('Token de autenticação obtido:', authResult.AccessToken);
            fetchMusicAndArtists(authResult.AccessToken);
        } else {
            console.error('Falha ao obter token de autenticação.');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
    }
}

async function fetchMusicAndArtists(token) {
    console.log('Buscando músicas e artistas...');
    try {
        const response = await client.getItems({
            IncludeItemTypes: 'Audio',
            Recursive: true,
            StartIndex: 0,
            Limit: 100,
            Fields: ['PrimaryImageAspectRatio']
        });
        if (response.Items) {
            console.log('Músicas obtidas:', response.Items);
            updateRadioApp(response.Items);
        } else {
            console.log('Nenhum item encontrado na resposta:', response);
        }
    } catch (error) {
        console.error('Erro ao buscar músicas e artistas:', error);
    }
}

function updateRadioApp(musicItems) {
    console.log('Atualizando a interface com as músicas obtidas...');
    const musicListContainer = document.getElementById('music-list');
    musicListContainer.innerHTML = ''; // Limpar conteúdo existente
    if (!musicItems || musicItems.length === 0) {
        musicListContainer.innerHTML = '<p>Nenhuma música encontrada.</p>';
        return;
    }
    musicItems.forEach(item => {
        const musicElement = document.createElement('div');
        musicElement.className = 'music-item';
        musicElement.innerHTML = `
            <img src="${serverAddress}/Items/${item.Id}/Images/Primary" alt="${item.Name}">
            <div class="music-info">
                <h4>${item.Name}</h4>
                <p>${item.ArtistItems.map(artist => artist.Name).join(', ')}</p>
            </div>
        `;
        musicListContainer.appendChild(musicElement);
    });
}

initializeClient();
