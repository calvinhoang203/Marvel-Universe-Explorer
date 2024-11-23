export async function fetchCharactersGallery() {
    const content = document.getElementById('content');
    showLoading(); // Show loading overlay

    try {
        const url = `${API_BASE_URL}characters?${generateAuthParams()}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();
        const characters = data.data.results.filter(character =>
            character.description && character.description.trim() !== ""
        );

        if (characters.length === 0) {
            content.innerHTML = `<div class="error">No characters with descriptions found. Try again later.</div>`;
            hideLoading();
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
        console.error('Error fetching characters:', error);
        content.innerHTML = `<div class="error">Failed to load characters. Please try again later.</div>`;
    } finally {
        hideLoading();
    }
}
