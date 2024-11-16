// Marvel API base URL and keys
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = '019a01428557678a2bcee4e136a0a229';
const PRIVATE_KEY = '5eca07b6a7f8426a8b4ca6c30fef39b42f951957';

// Check if the keys are valid
if (!PUBLIC_KEY || !PRIVATE_KEY) {
    console.error("Error: PUBLIC_KEY or PRIVATE_KEY is missing. Please add your API keys.");
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (typeof CryptoJS === 'undefined') {
        console.error("Error: CryptoJS library is not loaded. Please ensure it's included in your project.");
        return;
    }
    addNavigationEventListeners();
    fetchCharacterOfTheDay(); // Display the default "Home" content
});

// Add navigation event listeners for Home, Characters, and Comics
function addNavigationEventListeners() {
    const links = [
        { id: 'home-link', action: fetchCharacterOfTheDay },
        { id: 'characters-link', action: fetchCharacters },
        { id: 'comics-link', action: fetchComics },
    ];

    links.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                link.action();
            });
        } else {
            console.warn(`Warning: Element with ID "${link.id}" not found.`);
        }
    });
}

// Utility function to generate hash for API requests
function generateHash() {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    return { ts, hash };
}

// Function to fetch and display the Marvel Character of the Day
async function fetchCharacterOfTheDay() {
    const { ts, hash } = generateHash();
    const url = `${API_BASE_URL}characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=1&offset=${Math.floor(Math.random() * 100)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const character = data.data.results[0];
        displayCharacterOfTheDay(character);
    } catch (error) {
        console.error("Error fetching Character of the Day:", error.message);
    }
}

// Function to display the Character of the Day
function displayCharacterOfTheDay(character) {
    const content = document.getElementById('content');
    if (!content) {
        console.error("Error: Element with ID 'content' not found.");
        return;
    }

    const imageUrl = character.thumbnail
        ? `${character.thumbnail.path}.${character.thumbnail.extension}`
        : 'https://via.placeholder.com/200x200?text=No+Image';

    const description = character.description || "No description available.";

    const comicsList = character.comics.items
        .slice(0, 5)
        .map(comic => `<li>${comic.name}</li>`)
        .join("") || "<li>No comics available.</li>";

    content.innerHTML = `
        <h2>Marvel Character of the Day</h2>
        <div class="character-card">
            <img src="${imageUrl}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${description}</p>
            <h3>Comics:</h3>
            <ul>${comicsList}</ul>
        </div>
    `;
}

// Fetch Marvel Characters for the Gallery
async function fetchCharacters() {
    const { ts, hash } = generateHash();
    const url = `${API_BASE_URL}characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=9`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayGallery(data.data.results, 'character');
    } catch (error) {
        console.error("Error fetching characters:", error.message);
    }
}

// Fetch Marvel Comics
async function fetchComics() {
    const { ts, hash } = generateHash();
    const url = `${API_BASE_URL}comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=9`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayGallery(data.data.results, 'comic');
    } catch (error) {
        console.error("Error fetching comics:", error.message);
    }
}

// Function to display items in a grid gallery format
function displayGallery(items, type) {
    const content = document.getElementById('content');
    if (!content) {
        console.error("Error: Element with ID 'content' not found.");
        return;
    }

    content.innerHTML = `<h2>${type === 'character' ? 'Marvel Characters Gallery' : 'Marvel Comics'}</h2>`;

    const row = document.createElement('div');
    row.className = 'row';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const imageUrl = item.thumbnail
            ? `${item.thumbnail.path}.${item.thumbnail.extension}`
            : 'https://via.placeholder.com/200x200?text=No+Image';

        const description = item.description || "No description available.";

        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.name || item.title}">
            <h3>${item.name || item.title}</h3>
            <p>${description}</p>
            ${type === 'comic' ? `<p><strong>Creators:</strong> ${item.creators.items.map(creator => creator.name).join(', ') || 'Unknown'}</p>` : ''}
        `;

        row.appendChild(card);
    });

    content.appendChild(row);
}
