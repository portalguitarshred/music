async function getAuthToken(username, password, apiKey) {
    const response = await fetch('http://localhost:8096/Users/AuthenticateByName', {
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
    return data.AccessToken;
}

async function fetchMusicAndArtists(token, apiKey) {
    const response = await fetch('http://localhost:8096/Items?IncludeItemTypes=Audio', {
        method: 'GET',
        headers: {
            'X-Emby-Token': token,
            'X-Emby-Authorization': `MediaBrowser Client="YourAppName", Device="YourDeviceName", DeviceId="YourDeviceId", Version="1.0.0", Token="${apiKey}"`
        }
    });
    const data = await response.json();
    return data.Items;
}

function updateRadioApp(musicItems) {
    const musicListContainer = document.getElementById('music-list');
    musicListContainer.innerHTML = ''; // Clear existing content
    musicItems.forEach(item => {
        const musicElement = document.createElement('div');
        musicElement.className = 'music-item';
        musicElement.innerHTML = `
            <img src="http://localhost:8096/Items/${item.Id}/Images/Primary" alt="${item.Name}">
            <div class="music-info">
                <h4>${item.Name}</h4>
                <p>${item.ArtistItems.map(artist => artist.Name).join(', ')}</p>
            </div>
        `;
        musicListContainer.appendChild(musicElement);
    });
}

async function initialize() {
    const apiKey = 'sua-chave-de-api'; // Insira sua chave de API aqui
    const username = 'seu-usuario'; // Insira seu nome de usuário aqui
    const password = 'sua-senha'; // Insira sua senha aqui
    const token = await getAuthToken(username, password, apiKey);
    const musicItems = await fetchMusicAndArtists(token, apiKey);
    updateRadioApp(musicItems);
}

initialize();
