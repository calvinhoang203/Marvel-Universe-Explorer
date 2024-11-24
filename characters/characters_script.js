import { showLoading, hideLoading, API_BASE_URL, generateAuthParams } from '../main_script.js';

// This function fetches and displays a gallery of Marvel characters with links to their detailed comic appearances
export async function fetchCharactersGallery() {
    const content = document.getElementById('content');
    showLoading(); // This shows a loading overlay while fetching data

    try {
        const url = `${API_BASE_URL}characters?${generateAuthParams()}&limit=100`; // This fetches the first 100 characters from the API
        const response = await fetch(url);
        const data = await response.json();
        const characters = data.data.results;

        if (characters.length === 0) {
            content.innerHTML = `<div class="error">No characters found. Please check back later</div>`;
            hideLoading(); // This hides the loading overlay
            return;
        }

        // This dynamically creates a gallery of characters with clickable links
        content.innerHTML = `
        <div class="character-gallery-note">
            <p><strong>Note:</strong> Clicking on a character will take you to the comics where the character appears for more details</p>
        </div>
        <div class="gallery">
            ${characters.map(character => {
                const characterUrl = `https://www.marvel.com/comics/characters/${character.id}/${character.name.toLowerCase().replace(/ /g, '_')}`; // This generates the character URL

                return `
                    <a href="${characterUrl}" target="_blank" class="gallery-item">
                        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                        <h3>${character.name}</h3>
                        <p>${character.description || 'Description not available'}</p>
                    </a>
                `;
            }).join('')}
        </div>`;
    } catch (error) {
        console.error('Error fetching characters:', error);
        content.innerHTML = `<div class="error">Failed to load characters. Try refreshing the page</div>`;
    } finally {
        hideLoading(); // This ensures the loading overlay is hidden even if an error occurs
    }
}