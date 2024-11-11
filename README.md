# Marvel API Explorer

Marvel API Explorer is a web-based project that allows users to explore information about Marvel characters, comics, and creators. This project uses HTML, CSS, and JavaScript to display data retrieved from the Marvel API. Users can navigate between different sections to view details on popular Marvel characters, comic issues, and notable creators.

## Project Structure

The project is organized with the following files:
- `index.html` - The main HTML file that structures the webpage.
- `style.css` - The CSS file that styles the page, including layout and design.
- `script.js` - The JavaScript file containing the code to fetch and display data from the Marvel API.
- `README.md` - This file, providing an overview and instructions.
  
## Features

- Displays Marvel **Characters**, **Comics**, and **Creators** information using the Marvel API.
- Provides a user-friendly navigation between different sections to explore each category.
- Shows character images, descriptions, comic titles, issue numbers, and creator roles.

## API Endpoints

The project uses the following Marvel API endpoints:
- **Characters**: Displays a list of Marvel characters, including images and brief descriptions.
- **Comics**: Shows a list of comics, including titles, issue numbers, and cover images.
- **Creators**: Lists creators, with names and roles (e.g., writer, artist).

## Setup Instructions

### Requirements
- A Marvel Developer account to obtain an API key ([Marvel Developer Portal](https://developer.marvel.com/)).
- A text editor for editing the files (e.g., VSCode).
- A browser to view and test the project.

### API Keys
1. **Obtain an API Key**: Sign up at the Marvel Developer Portal and create an application to get a public and private API key.
2. **Secure Your Keys**:
   - This project includes instructions to directly test API keys. When deploying, store keys in an `.env` file and use a tool like **Vite** to securely inject them.
