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

// Fetch Characters Gallery
async function fetchCharactersGallery() {
    const content = document.getElementById('content');
    showLoading(); // Show loading overlay

    try {
        const url = `${API_BASE_URL}characters?${generateAuthParams()}&limit=100`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        const characters = data.data.results.filter(character => character.description && character.description.trim() !== "");

        if (characters.length === 0) {
            content.innerHTML = `<div class="error">No characters with descriptions found. Try again later.</div>`;
            hideLoading(); // Hide loading overlay
            return;
        }

        content.innerHTML = `<div class="gallery">
            ${characters.map(character => `
                <div class="gallery-item">
                    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                    <h3>${character.name}</h3>
                    <p>${character.description}</p>
                </div>
            `).join('')}
        </div>`;
    } catch (error) {
        console.error('Error fetching characters gallery:', error);
        content.innerHTML = `<div class="error">Failed to load content. Please try again later.</div>`;
    } finally {
        hideLoading(); // Ensure the loading overlay is hidden
    }
}

// Fetch Comics Gallery
async function fetchComicsGallery() {
    const content = document.getElementById('content');
    showLoading(); // Show loading overlay

    try {
        const url = `${API_BASE_URL}comics?${generateAuthParams()}&limit=20`; // Adjust the limit as needed
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        const comics = data.data.results.filter(comic => 
            comic.thumbnail && 
            comic.thumbnail.path && 
            !comic.thumbnail.path.includes('image_not_available') && 
            comic.creators.items.length > 0 &&
            comic.prices.length > 0 && 
            comic.prices[0].price > 0
        );

        if (comics.length === 0) {
            content.innerHTML = `<div class="error">No comics with valid thumbnails, creators, or prices found. Try again later.</div>`;
            hideLoading();
            return;
        }

        // Render comics gallery
        content.innerHTML = `
            <div class="gallery">
                ${comics.map(comic => `
                    <div 
                        class="gallery-item" 
                        onclick="window.open('${comic.urls.length > 0 ? comic.urls[0].url : '#'}', '_blank')"
                    >
                        <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                        <h3>${comic.title}</h3>
                        <h4>Issue Number:</h4>
                        <p>${comic.issueNumber || 'N/A'}</p>
                        <h4>Creators:</h4>
                        <p>${comic.creators.items.map(creator => `${creator.name} (${creator.role})`).join(', ')}</p>
                        <h4>Stories:</h4>
                        <ul>
                            ${comic.stories.items.length > 0
                                ? comic.stories.items.map(story => `
                                    <li>
                                        <strong>${story.name}</strong>
                                        <br><em>Type:</em> ${story.type || 'Unknown'}
                                    </li>
                                  `).join('')
                                : '<li>No stories available.</li>'}
                        </ul>
                        <h4>Price:</h4>
                        <p>$${comic.prices[0].price.toFixed(2)}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching comics gallery:', error);
        content.innerHTML = `<div class="error">Failed to load content. Please try again later.</div>`;
    } finally {
        hideLoading(); // Ensure the loading overlay is hidden
    }
}



// Navigation Setup
function setupNavigation() {
    const links = [
        { id: 'home-link', action: fetchHomeContent },
        { id: 'characters-link', action: fetchCharactersGallery },
        { id: 'comics-link', action: fetchComicsGallery },
    ];

    links.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                link.action(); // Load the corresponding page content
            });
        }
    });
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchHomeContent(); // Show home content on initial load
});
