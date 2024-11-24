# Marvel Universe Explorer

Marvel Universe Explorer is a web-based project that allows users to explore information about Marvel characters, comics, and creators. This project uses HTML, CSS, and JavaScript to display data retrieved from the Marvel API. Users can navigate between different sections to view details on popular Marvel characters, comic issues, and notable creators.

## Inspiration

When I was little, I find myself drawn into the Marvel Universe—a world of heroes, villains, and incredible stories that sparked my imagination. Creating the Marvel Universe Explorer site is my way of sharing that excitement, letting others dive into these iconic characters and their stories.

## Features

### Home
This section welcomes users to the Marvel Universe Explorer, providing a brief overview of the site's purpose and guiding users to the available galleries.

### Marvel Characters Gallery
This section displays a gallery of Marvel characters, showcasing their images, names, and brief descriptions. Clicking on a character redirects the user to its associated comics on the Marvel website.

### Marvel Comics Gallery
This section lists a collection of Marvel comics with cover images, titles, and issue numbers. Users can click on any comic to view detailed information on the Marvel website.

## Project Structure

The project is organized with the following files and folders:

- **`index.html`**  
  The main HTML file that structures the webpage.

- **`style.css`**  
  The global CSS file that styles the page, including layout and design.

- **`main_script.js`**  
  The shared JavaScript file responsible for API integration.

- **`README.md`**  
  This file provides an overview and setup instructions for the project.

- **Folders:**

  - **`animations/`**  
    Contains `jarvis_animations.css` which adds animations to enhance user interaction.

  - **`characters/`**  
    - `characters_script.js`: Handles character-related functionalities.  
    - `characters_style.css`: Styles for the character gallery.

  - **`comics/`**  
    - `comics_script.js`: Handles comic-related functionalities.  
    - `comics_style.css`: Styles for the comic gallery.

  - **`home/`**  
    Contains `home_style.css` which styles the Home page.

  - **`images/`**  
    Contains Marvel logos and background images for the application.

## Setup Instructions

### Prerequisites
- **Marvel API Keys:**  
  Sign up at the [Marvel Developer Portal](https://developer.marvel.com/) and create an app to get your public and private keys.
- **Tools:**  
  - A code editor like VSCode  
  - A browser such as Chrome, Edge, or Firefox  
  - A local server tool like `http-server`

### Steps to Run

1. **Clone or Download the Repository**
   - Clone the repository or download it as a ZIP file and extract it to your system.

2. **Add API Keys**
   - Open `main_script.js` in a code editor.
   - Locate the API key variables and replace the placeholders with your keys:
     ```javascript
     const PUBLIC_KEY = "your-public-key";
     const PRIVATE_KEY = "your-private-key";
     ```

3. **Start a Local Server**
   - Navigate to the project directory in your terminal.
   - Run the following command:
     ```bash
     http-server -p 8000
     ```
   - If `http-server` is not installed, you can install it using:
     ```bash
     npm install -g http-server
     ```

4. **Access the Application**
   - Open your browser and enter the following URL:
     ```
     http://localhost:8000
     ```

5. **Explore the Marvel Universe**
   - Browse through the Home, Marvel Characters Gallery, and Marvel Comics Gallery to explore Marvel’s content.

## Notes

- Ensure your API keys are correctly configured in `main_script.js` to fetch data from the Marvel API.
- If deploying this project, use environment variables (e.g., `.env`) to secure your API keys and avoid exposing them in the source code.
- Images and styles can be customized by modifying the corresponding CSS files in the `characters`, `comics`, `home`, and `animations` folders.
