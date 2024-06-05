const jellyfinServerUrl = 'http://localhost:8096/web/#/home.html'; // Atualize com a URL do seu servidor Jellyfin

async function getAuthToken(username, password, apiKey) {
    console.log('Obtendo token de autenticação...');
    try {
        const response = await fetch(`${jellyfinServerUrl}/Users/AuthenticateByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Jellyfin-Authorization': `MediaBrowser Client="guitarshred", Device="Mac de Wagner", DeviceId="12345-ABCDE-67890-FGHIJ", Version="13.6.4", Token="${972a939ef38b43d384eb0a190f68fe67}"` // Substitua pelos seus dados reais
            },
            body: JSON.stringify({
                Username: wagnerribeiro, // Substitua pelo seu nome de usuário
                Pw: 1607wcr77 // Substitua pela sua senha
            })
        });
        if (!response.ok) {
            throw new Error(`Erro na autenticação: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Token obtido:', data);
        return data.AccessToken;
    } catch (error) {
        console.error('Erro ao obter o token:', error);
        throw error; // Lançar erro para que possa ser capturado na função initialize
    }
}

async function fetchMusicAndArtists(token, apiKey) {
    console.log('Buscando músicas e artistas...');
    try {
        const response = await fetch(`${jellyfinServerUrl}/Items?IncludeItemTypes=Audio`, {
            method: 'GET',
            headers: {
                'X-Jellyfin-Token': token,
                'X-Jellyfin-Authorization': `MediaBrowser Client="guitarshred", Device="Mac de Wagner", DeviceId="12345-ABCDE-67890-FGHIJ", Version="13.6.4", Token="${972a939ef38b43d384eb0a190f68fe67}"` // Substitua pelos seus dados reais
            }
        });
        if (!response.ok) {
            throw new Error(`Erro ao buscar músicas: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Resposta da API:', data);
        if (data.Items) {
            console.log('Músicas obtidas:', data.Items);
            return data.Items;
        } else {
            console.log('Nenhum item encontrado na resposta:', data);
            return [];
        }
    } catch (error) {
        console.error('Erro ao buscar músicas e artistas:', error);
        throw error; // Lançar erro para que possa ser capturado na função initialize
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
        const apiKey = '972a939ef38b43d384eb0a190f68fe67'; // Substitua pela sua chave de API
        const username = 'wagnerribeiro'; // Substitua pelo seu nome de usuário
        const password = '1607wcr77'; // Substitua pela sua senha
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


