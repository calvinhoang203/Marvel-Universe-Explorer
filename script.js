// Base URL for Marvel API
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
// Public and Private API Keys
const PUBLIC_KEY = ''; // Replace with your actual public key
const PRIVATE_KEY = ''; // Replace with your actual private key

// Fetch and display characters
async function fetchCharacters() {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY); // Use md5 function from js-md5

    try {
        const response = await fetch(`${API_BASE_URL}characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayCharacters(data.data.results);
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

function displayCharacters(characters) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.description || 'No description available.'}</p>
        `;
        content.appendChild(characterCard);
    });
}

// Fetch and display comics
async function fetchComics() {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    try {
        const response = await fetch(`${API_BASE_URL}comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayComics(data.data.results);
    } catch (error) {
        console.error("Error fetching comics:", error);
    }
}

function displayComics(comics) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    comics.forEach(comic => {
        const comicCard = document.createElement('div');
        comicCard.className = 'comic-card';
        comicCard.innerHTML = `
            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
            <h2>${comic.title}</h2>
            <p>${comic.description || 'No description available.'}</p>
        `;
        content.appendChild(comicCard);
    });
}

// Fetch and display creators
async function fetchCreators() {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    try {
        const response = await fetch(`${API_BASE_URL}creators?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayCreators(data.data.results);
    } catch (error) {
        console.error("Error fetching creators:", error);
    }
}

function displayCreators(creators) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    creators.forEach(creator => {
        const creatorCard = document.createElement('div');
        creatorCard.className = 'creator-card';
        creatorCard.innerHTML = `
            <h2>${creator.fullName}</h2>
            <p>Role: ${creator.role || 'Unknown role'}</p>
            <p>${creator.description || 'No description available.'}</p>
        `;
        content.appendChild(creatorCard);
    });
}

// Add event listeners for each link
document.getElementById('characters-link').addEventListener('click', (e) => {
    e.preventDefault();
    fetchCharacters();
});

document.getElementById('comics-link').addEventListener('click', (e) => {
    e.preventDefault();
    fetchComics();
});

document.getElementById('creators-link').addEventListener('click', (e) => {
    e.preventDefault();
    fetchCreators();
});