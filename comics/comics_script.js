export async function fetchComicsGallery() {
    const content = document.getElementById('content');
    showLoading(); // Show loading overlay

    try {
        const url = `${API_BASE_URL}comics?${generateAuthParams()}&limit=100`;
        const response = await fetch(url);
        const data = await response.json();
        const comics = data.data.results.filter(comic =>
            comic.thumbnail &&
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

        content.innerHTML = `<div class="gallery">
            ${comics.map(comic => `
                <div class="gallery-item">
                    <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                    <h3>${comic.title}</h3>
                    <p>Price: $${comic.prices[0].price}</p>
                </div>
            `).join('')}
        </div>`;
    } catch (error) {
        console.error('Error fetching comics:', error);
        content.innerHTML = `<div class="error">Failed to load comics. Please try again later.</div>`;
    } finally {
        hideLoading();
    }
}
