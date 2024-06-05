const jellyfinServerUrl = 'http://localhost:8096'; // Atualize com a URL do seu servidor Jellyfin

async function getAuthToken(username, password, apiKey) {
    console.log('Obtendo token de autenticação...');
    try {
        const response = await fetch(`${jellyfinServerUrl}/Users/AuthenticateByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Emby-Authorization': `MediaBrowser Client="YourAppName", Device="YourDeviceName", DeviceId="YourDeviceId", Version="1.0.0", Token="${apiKey}"`
            },
            body: JSON.stringify({
                Username: username,
                Pw: password
            })
        });
        const data = await response.json();
        console.log('Token obtido:', data.AccessToken);
        return data.AccessToken;
    } catch (error) {
        console.error('Erro ao obter o token:', error);
    }
}

async function fetchMusicAndArtists(token, apiKey) {
    console.log('Buscando músicas e artistas...');
    try {
        const response = await fetch(`${jellyfinServerUrl}/Items?IncludeItemTypes=Audio`, {
            method: 'GET',
            headers: {
                'X-Emby-Token': token,
                'X-Emby-Authorization': `MediaBrowser Client="YourAppName", Device="YourDeviceName", DeviceId="YourDeviceId", Version="1.0.0", Token="${apiKey}"`
            }
        });
        const data = await response.json();
        console.log('Músicas obtidas:', data.Items);
        return data.Items;
    } catch (error) {
        console.error('Erro ao buscar músicas e artistas:', error);
    }
}

function updateRadioApp(musicItems) {
    console.log('Atualizando a interface com as músicas obtidas...');
    const musicListContainer = document.getElementById('music-list');
    musicListContainer.innerHTML = ''; // Clear existing content
    if (!musicItems || musicItems.length === 0) {
        musicListContainer.innerHTML = '<p>Nenhuma música encontrada.</p>';
        return;
    }
    musicItems.forEach(item => {
        const musicElement = document.createElement('div');
        musicElement.className = 'music-item';
        musicElement.innerHTML = `
            <img src="${jellyfinServerUrl}/Items/${item.Id}/Images/Primary" alt="${item.Name}">
            <div class="music-info">
                <h4>${item.Name}</h4>
                <p>${item.ArtistItems.map(artist => artist.Name).join(', ')}</p>
            </div>
        `;
        musicListContainer.appendChild(musicElement);
    });
}

async function initialize() {
    console.log('Inicializando aplicação...');
    try {
        const apiKey = '972a939ef38b43d384eb0a190f68fe67'; // Insira sua chave de API aqui
        const username = 'wagnerribeiro'; // Insira seu nome de usuário aqui
        const password = '1607wcr77'; // Insira sua senha aqui
        const token = await getAuthToken(username, password, apiKey);
        if (token) {
            console.log('Token de autenticação obtido:', token);
            const musicItems = await fetchMusicAndArtists(token, apiKey);
            console.log('Itens de música obtidos:', musicItems);
            updateRadioApp(musicItems);
        } else {
            console.error('Falha ao obter token de autenticação.');
        }
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
    }
}

initialize();
