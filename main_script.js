import { fetchCharactersGallery } from './characters/characters_script.js';
import { fetchComicsGallery } from './comics/comics_script.js';

// Marvel API base URL and keys
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = '';
const PRIVATE_KEY = '';

// Function to generate a random hash for the Marvel API
function generateHash(ts) {
    return CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
}

// Helper function to generate authentication parameters
function generateAuthParams() {
    const ts = new Date().getTime();
    const hash = generateHash(ts);
    return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
}

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "flex"; // Ensure the overlay uses flex for centering
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}

// Fetch a random Marvel character for Home
async function fetchRandomCharacter() {
    const ts = new Date().getTime();
    const hash = generateHash(ts);

    showLoading(); // Show loading overlay
    while (true) { // Loop until a valid character is found
        const limit = 1;
        const offset = Math.floor(Math.random() * 1500); // Adjust for API's character range
        const url = `${API_BASE_URL}characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();

            if (data && data.data && data.data.results && data.data.results.length > 0) {
                const character = data.data.results[0];
                if (character.description && character.description.trim() !== "") {
                    // Found a valid character with a description
                    const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                    const name = character.name;
                    const description = character.description;
                    const comics = character.comics.items
                        .slice(0, 3)
                        .map((comic) => `<li>${comic.name}</li>`)
                        .join('') || '<li>No comics available.</li>';

                    const content = document.getElementById('content');
                    content.innerHTML = `
                        <div class="welcome">
                            <h1>Welcome to the Marvel Universe Explorer</h1>
                            <p>Discover the amazing world of Marvel superheroes and comics. Explore the character of the day or browse through our galleries to find your favorite Marvel stories.</p>
                        </div>
                        <div class="character-of-the-day">
                            <h2>Marvel Character of the Day</h2>
                            <div class="character-card">
                                <img src="${thumbnail}" alt="${name}">
                                <h3>${name}</h3>
                                <p>${description}</p>
                                <h4>Comics:</h4>
                                <ul>${comics}</ul>
                            </div>
                        </div>
                    `;
                    hideLoading(); // Hide loading overlay
                    return; // Exit the loop once a valid character is displayed
                }
            }
        } catch (error) {
            console.error('Error fetching character:', error);
            // Continue the loop silently without interrupting the user experience
        }
    }
}

// Fetch Home Content
function fetchHomeContent() {
    const content = document.getElementById('content');
    fetchRandomCharacter();
}




// Navigation Setup
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home-link').addEventListener('click', fetchHomeContent);
    document.getElementById('characters-link').addEventListener('click', fetchCharactersGallery);
    document.getElementById('comics-link').addEventListener('click', fetchComicsGallery);
    fetchHomeContent(); // Load the home content by default
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchHomeContent(); // Show home content on initial load
});
