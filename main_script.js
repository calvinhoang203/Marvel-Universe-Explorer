import { fetchCharactersGallery } from './characters/characters_script.js';
import { fetchComicsGallery } from './comics/comics_script.js';

export const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = '';
const PRIVATE_KEY = '';

function generateHash(ts) {
    return CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
}

export function generateAuthParams() {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
}

export function showLoading() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'flex';
}

export function hideLoading() {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
}


// Fetch a random character

async function fetchRandomCharacter() {
    showLoading();

    const limit = 1; // Fetch one character at a time
    const maxOffset = 1600; // Adjust maxOffset based on the total number of characters in the API
    let character = null;

    try {
        while (!character) {
            try {
                const offset = Math.floor(Math.random() * maxOffset);
                const url = `${API_BASE_URL}characters?limit=${limit}&offset=${offset}&${generateAuthParams()}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.error(`HTTP Error: ${response.status} at offset ${offset}`);
                    continue;
                }

                const data = await response.json();
                character = data.data.results.find(
                    (char) => char.description && char.description.trim() !== ""
                );
            } catch (innerError) {
                console.error("Error during fetch or parsing:", innerError);
                continue;
            }
        }

        // Fetch comics and extract creator names
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
                console.error("Error fetching creators from comics:", error);
            }
        }

        // Build the content
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
                <p>Discover the amazing world of Marvel superheroes and comics. Explore the character of the day or browse through our galleries to find your favorite Marvel stories.</p>
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
        console.error("Error fetching character:", error);

        const content = document.getElementById("content");
        content.innerHTML = `
            <div class="error">
                <h2>Something went wrong.</h2>
                <p>Failed to load character of the day. Please try again later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    } finally {
        hideLoading();
    }
}





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

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchRandomCharacter();
});