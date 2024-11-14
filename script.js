// Marvel API base URL and keys
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = '019a01428557678a2bcee4e136a0a229';
const PRIVATE_KEY = '5eca07b6a7f8426a8b4ca6c30fef39b42f951957';

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    addNavigationEventListeners();
});

// Add navigation event listeners for main categories
function addNavigationEventListeners() {
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
    document.getElementById('events-link').addEventListener('click', (e) => {
        e.preventDefault();
        fetchEvents();
    });
    document.getElementById('series-link').addEventListener('click', (e) => {
        e.preventDefault();
        fetchSeries();
    });
    document.getElementById('stories-link').addEventListener('click', (e) => {
        e.preventDefault();
        fetchStories();
    });
}

console.log("CryptoJS:", CryptoJS); // Check if CryptoJS is defined

// Utility function to generate hash for API requests
function generateHash() {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString(); // Use CryptoJS.MD5 for hashing
    console.log("Hash generated:", hash); // Log hash for debugging
    return { ts, hash };
}

// Fetch and display characters
async function fetchCharacters() {
    const { ts, hash } = generateHash();
    try {
        const response = await fetch(`${API_BASE_URL}characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayItems(data.data.results, 'character');
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}


// Fetch and display comics
async function fetchComics() {
    const { ts, hash } = generateHash();
    try {
        const response = await fetch(`${API_BASE_URL}comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayItems(data.data.results, 'comic');
    } catch (error) {
        console.error("Error fetching comics:", error);
    }
}

// Fetch and display creators
async function fetchCreators() {
    const { ts, hash } = generateHash();
    try {
        const response = await fetch(`${API_BASE_URL}creators?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayItems(data.data.results, 'creator');
    } catch (error) {
        console.error("Error fetching creators:", error);
    }
}

// Fetch and display events
async function fetchEvents() {
    const { ts, hash } = generateHash();
    try {
        const response = await fetch(`${API_BASE_URL}events?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayItems(data.data.results, 'event');
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Fetch and display series
async function fetchSeries() {
    const { ts, hash } = generateHash();
    try {
        const response = await fetch(`${API_BASE_URL}series?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayItems(data.data.results, 'series');
    } catch (error) {
        console.error("Error fetching series:", error);
    }
}

// Fetch and display stories
async function fetchStories() {
    const { ts, hash } = generateHash();
    try {
        const response = await fetch(`${API_BASE_URL}stories?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayItems(data.data.results, 'story');
    } catch (error) {
        console.error("Error fetching stories:", error);
    }
}

// Function to display fetched items in the main content area
function displayItems(items, type) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear existing content

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `${type}-card`;
        card.innerHTML = `
            <h2>${item.name || item.title || 'No Title Available'}</h2>
            <p>${item.description || 'No description available.'}</p>
        `;

        if (item.thumbnail) {
            card.innerHTML = `<img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name || item.title}">` + card.innerHTML;
        }

        content.appendChild(card);
    });
}