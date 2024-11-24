import { showLoading, hideLoading, API_BASE_URL, generateAuthParams } from '../main_script.js';

export async function fetchCharactersGallery() {
    const content = document.getElementById('content');
    showLoading(); // Show loading overlay

    try {
        const url = `${API_BASE_URL}characters?${generateAuthParams()}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();
        const characters = data.data.results;

        if (characters.length === 0) {
            content.innerHTML = `<div class="error">No characters found. Try again later.</div>`;
            hideLoading();
            return;
        }

        // Dynamically populate the gallery with characters
        content.innerHTML = `
        <div class="note">
            <p><strong>Note:</strong> Clicking on a character will take you to the comics where the character appears for more details.</p>
        </div>
        <div class="gallery">
            ${characters.map(character => {
                // Generate a link to the character's Marvel page
                const characterUrl = `https://www.marvel.com/comics/characters/${character.id}/${character.name.toLowerCase().replace(/ /g, '_')}`;

                return `
                    <a href="${characterUrl}" target="_blank" class="gallery-item">
                        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                        <h3>${character.name}</h3>
                        <p>${character.description || 'Description not available.'}</p>
                    </a>
                `;
            }).join('')}
        </div>`;
    } catch (error) {
        console.error('Error fetching characters:', error);
        content.innerHTML = `<div class="error">Failed to load characters. Please try again later.</div>`;
    } finally {
        hideLoading();
    }
}
