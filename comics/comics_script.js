import { showLoading, hideLoading, API_BASE_URL, generateAuthParams } from '../main_script.js';

export async function fetchComicsGallery() {
    const content = document.getElementById('content');
    showLoading(); // Show loading overlay

    try {
        const url = `${API_BASE_URL}comics?${generateAuthParams()}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();
        const comics = data.data.results.filter(comic =>
            comic.thumbnail &&
            comic.prices.length > 0 &&
            comic.prices[0].price > 0
        );

        if (comics.length === 0) {
            content.innerHTML = `<div class="error">No comics with valid thumbnails, creators, or prices found. Try again later.</div>`;
            hideLoading();
            return;
        }

        // Add the note above the gallery
        const note = `<p class="note"><strong>Note:</strong> Click on any comic to view its detailed information on the Marvel site.</p>`;
        
        // Populate the gallery
        const gallery = `
            <div class="gallery">
                ${comics.map(comic => {
                    const detailUrl = comic.urls.find(url => url.type === 'detail')?.url || '#';
                    const creators = comic.creators.items.map(creator => `${creator.name} (${creator.role})`).join(', ');
                    return `
                        <a href="${detailUrl}" target="_blank" class="gallery-item">
                            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                            <h3>${comic.title}</h3>
                            <p>Price: $${comic.prices[0]?.price || 'N/A'}</p>
                            <div class="creators">
                                <span>Creators:</span>
                                <span>${creators}</span>
                            </div>
                        </a>
                    `;
                }).join('')}
            </div>`;
        
        // Insert note and gallery into content
        content.innerHTML = note + gallery;

    } catch (error) {
        console.error('Error fetching comics:', error);
        content.innerHTML = `<div class="error">Failed to load comics. Please try again later.</div>`;
    } finally {
        hideLoading();
    }
}
