// Base URL for Marvel API
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
// Public and Private API Keys
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your actual public key
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY'; // Replace with your actual private key

/**
 * Function to fetch character data from Marvel API.
 * This function generates a hash required for Marvel API authentication and makes a GET request to fetch characters.
 */
async function fetchCharacters() {
    // Get the current timestamp in milliseconds
    const ts = new Date().getTime();
    // Generate MD5 hash using timestamp, private key, and public key (using js-md5 library or another method)
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY); 

    try {
        // Make the GET request to Marvel API for character data
        const response = await fetch(`${API_BASE_URL}characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        
        // Check if the response is not successful
        if (!response.ok) {
            // Throw an error if response status is not in 200-299 range
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data as JSON
        const data = await response.json();
        // Pass the character data to display function
        displayCharacters(data.data.results);
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error("Error fetching characters:", error);
    }
}

/**
 * Function to display character data on the page.
 * This function creates HTML elements for each character and appends them to the main content area.
 * @param {Array} characters - Array of character objects from Marvel API.
 */
function displayCharacters(characters) {
    // Get the main content area where characters will be displayed
    const content = document.getElementById('content');
    // Clear any existing content
    content.innerHTML = '';

    // Loop through each character and create a card with character information
    characters.forEach(character => {
        // Create a div element for each character card
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        // Set the inner HTML of the character card with character image, name, and description
        characterCard.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.description || 'No description available.'}</p>
        `;
        // Append the character card to the content area
        content.appendChild(characterCard);
    });
}

// Add event listener to "Characters" link
// When the link is clicked, it prevents the default link action and calls fetchCharacters function
document.getElementById('characters-link').addEventListener('click', (e) => {
    e.preventDefault();
    fetchCharacters();
});