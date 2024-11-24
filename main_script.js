import { fetchCharactersGallery } from './characters/characters_script.js';
import { fetchComicsGallery } from './comics/comics_script.js';


// Base URL for the Marvel API
export const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';

// Marvel API keys
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

// This function generates the MD5 hash required for Marvel API authentication
function generateHash(ts) {
    return CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
}

// This function creates the authentication parameters needed for API calls
export function generateAuthParams() {
    const ts = new Date().getTime(); // Use the current timestamp
    const hash = generateHash(ts);
    return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
}

// This function shows the loading overlay on the screen while data is being fetched
export function showLoading() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'flex';
}

// This function hides the loading overlay once the data is fetched
export function hideLoading() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
}

// This function fetches and displays a random Marvel character
async function fetchRandomCharacter() {
    showLoading(); // Start by showing the loading overlay
    const limit = 1; // Only fetch one character
    const maxOffset = 1600; // This determines the range of available characters
    let character = null;

    try {
        // Keep trying to fetch a character until one with a valid description is found
        while (!character) {
            const offset = Math.floor(Math.random() * maxOffset);
            const url = `${API_BASE_URL}characters?limit=${limit}&offset=${offset}&${generateAuthParams()}`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`HTTP error ${response.status} while fetching characters.`);
                continue;
            }

            const data = await response.json();
            character = data.data.results.find(
                (char) => char.description && char.description.trim() !== ""
            );
        }

        // This fetches additional details about the character's comics and creators
        const comicsUrl = character.comics.collectionURI
            ? `${character.comics.collectionURI}?${generateAuthParams()}`
            : null;
        let creatorNames = "Unknown";

        if (comicsUrl) {
            try {
                const comicsResponse = await fetch(comicsUrl);
                if (comicsResponse.ok) {
                    const comicsData = await comicsResponse.json();
                    const creators = comicsData.data.results.flatMap((comic) =>
                        comic.creators?.items || []
                    );
                    creatorNames =
                        [...new Set(creators.map((creator) => creator.name))].join(", ") ||
                        "Unknown";
                }
            } catch (error) {
                console.error("Error fetching creator details:", error);
            }
        }

        // This part handles displaying the character's details
        const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        const name = character.name;
        const description = character.description;
        const comicsList = character.comics.items
            .slice(0, 3)
            .map((comic) => `<li>${comic.name}</li>`)
            .join("") || "<li>No comics available.</li>";

        const content = document.getElementById("content");
        content.innerHTML = `
            <div class="welcome">
                <h1>Welcome to the Marvel Universe Explorer</h1>
                <p>Discover the amazing world of Marvel superheroes, comics, and creators. Explore the character of the day or browse through our galleries to find your favorite Marvel stories!</p>
            </div>
            <div class="character-of-the-day">
                <h2>Marvel Character of the Day</h2>
                <div class="character-card">
                    <img src="${thumbnail}" alt="${name}">
                    <h3>${name}</h3>
                    <p class="description">${description}</p>
                    <h4>Creators</h4>
                    <p>${creatorNames}</p>
                    <h4>Comics</h4>
                    <ul>${comicsList}</ul>
                    <div class="refresh-note">
                        <p style="margin-top: 1em; font-weight: bold;">Please refresh the page or click "Home" for another character.</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        // This handles errors and displays a user-friendly message
        console.error("Error loading character:", error);
        const content = document.getElementById("content");
        content.innerHTML = `
            <div class="error">
                <h2>Oops, something went wrong!</h2>
                <p>We couldn't load the character details. Try refreshing the page later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    } finally {
        // This makes sure the loading overlay is hidden even if there was an error
        hideLoading();
    }
}

// This function sets up navigation between Home, Characters, and Comics sections
function setupNavigation() {
    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        fetchRandomCharacter();
    });

    document.getElementById('characters-link').addEventListener('click', (e) => {
        e.preventDefault();
        fetchCharactersGallery();
    });

    document.getElementById('comics-link').addEventListener('click', (e) => {
        e.preventDefault();
        fetchComicsGallery();
    });
}

// This function initializes the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchRandomCharacter();
});
