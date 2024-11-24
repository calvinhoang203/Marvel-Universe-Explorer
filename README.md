# Marvel Universe Explorer

Hello and welcome! Marvel Universe Explorer is a fun and interactive web-based project that lets you dive into the amazing world of Marvel. Using HTML, CSS, and JavaScript, this project retrieves data from the Marvel API to showcase characters, comics, and creators. You can easily navigate between sections to explore details about your favorite Marvel heroes, iconic comic issues, and the creative minds behind them.

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

- **`index.html`**: The main HTML file that structures the webpage.

- **`style.css`**: The global CSS file that styles the page, including layout and design.

- **`main_script.js`**: The shared JavaScript file responsible for API integration.

- **`README.md`**: This file provides an overview and setup instructions for the project.

- **Folders:**

  - **`animations/`**  
    Contains `jarvis_animations.css` which adds animations to enhance user interaction.

  - **`characters/`**  
    - `characters_script.js`: Handles character-related functionalities.  
    - `characters_style.css`: Styles for the character gallery.

  - **`comics/`**  
    - `comics_script.js`: Handles comic-related functionalities.  
    - `comics_style.css`: Styles for the comic gallery.

  - **`home/`**: Contains `home_style.css` which styles the Home page.

  - **`images/`**: Contains Marvel logos and background images for the application.

## Setup Instructions

### Prerequisites
- **Marvel API Keys:**  
  Sign up at the [Marvel Developer Portal](https://developer.marvel.com/) and create an app to get your public and private keys.
- **Tools:**  
  - A code editor like Visual Studio Code (VSCode)
  - A browser such as Chrome, Edge, or Firefox  
  - Node.js and npm installed on your system (required for Vite)

### How to Run

1. **Clone or Download the Repository**
   - Clone the repository or download it as a ZIP file and extract it to your system.

2. **Add API Keys**
   - Create a file named `.env` in the root directory of the project.
   - Add your Marvel API keys to the `.env` file as follows:
     ```plaintext
     VITE_PUBLIC_KEY=your-public-key
     VITE_PRIVATE_KEY=your-private-key
     ```

3. **Install Dependencies**
   - Open a terminal in the project directory and run:
     ```bash
     npm install
     ```

4. **Start the Development Server**
   - Run the following command to start the Vite development server:
     ```bash
     npm run dev
     ```
   - You will see a local server URL like `http://localhost:5173`. Open this URL in your browser to view the application.

5. **Explore the Marvel Universe**
   - Browse through the Home, Marvel Characters Gallery, and Marvel Comics Gallery to explore Marvel’s content.

## Notes

- Ensure your `.env` file is not committed to version control. Add `.env` to your `.gitignore` file to secure your keys.
- If deploying the application, make sure the `.env` file is configured in the deployment environment to securely access the API keys.

## Conclusion

Thank you for exploring the Marvel Universe Explorer! I hope it brought some excitement and fun by letting you dive into Marvel’s incredible world of heroes, villains, and creators. If it added even a little joy to your day, then it has accomplished its purpose.

At the same time, creating this website has been a rewarding experience. I’m excited about the opportunity to join Code The Dream, which will provide hands-on learning and mentorship to help me grow as a developer. The skills I gain there will allow me to build more creative and engaging projects like this one.

Thank you for your time and interest—it truly means a lot!