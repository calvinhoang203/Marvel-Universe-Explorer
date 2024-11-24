import { showLoading, hideLoading, API_BASE_URL, generateAuthParams } from '../main_script.js';

// This function fetches and displays a gallery of comics from the Marvel API
export async function fetchComicsGallery() {
    const content = document.getElementById('content');
    showLoading(); // This shows a loading overlay while data is being fetched

    try {
        // Set the API URL to fetch a list of comics with necessary authentication parameters
        const url = `${API_BASE_URL}comics?${generateAuthParams()}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();

        // Filter comics to ensure valid thumbnails and prices are displayed
        const comics = data.data.results.filter(comic =>
            comic.thumbnail &&
            comic.prices.length > 0 &&
            comic.prices[0].price > 0
        );

        // Check if there are no comics and display a message if none are found
        if (comics.length === 0) {
            content.innerHTML = `<div class="error">No comics with valid thumbnails, creators, or prices found. Try again later.</div>`;
            hideLoading();
            return;
        }

        // This note tells the user what clicking on a comic will do
        const note = `<p class="note"><strong>Note:</strong> Click on any comic to view its detailed information on the Marvel site.</p>`;
        
        // Generate the gallery dynamically with details like title, price, and creators
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
        
        // Display the note and gallery content
        content.innerHTML = note + gallery;

    } catch (error) {
        // This handles any errors during the fetch process
        console.error('Error fetching comics:', error);
        content.innerHTML = `<div class="error">Failed to load comics. Please try again later.</div>`;
    } finally {
        hideLoading(); // This hides the loading overlay after data is fetched or an error occurs
    }
}
