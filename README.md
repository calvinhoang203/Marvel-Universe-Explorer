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


## How to Run

### Prerequisites
- **Marvel API Keys:**  
  Visit the [Marvel Developer Portal](https://developer.marvel.com/) to sign up and create an app. This will give you access to your public and private keys.
- **Tools Needed:**  
  - A text editor like Visual Studio Code (VSCode)  
  - A browser such as Chrome, Edge, or Firefox  
  - Node.js and npm installed on your computer (required for Vite)

### How to Run

1. **Clone or Download the Repository**  
   - Clone the repository using Git or download it as a ZIP file. Extract the ZIP file to your computer.

2. **Add Your API Keys**  
   - In the root folder of the project, create a file called `.env`.  
   - Add your API keys to this file like this:
     ```plaintext
     VITE_PUBLIC_KEY=your-public-key
     VITE_PRIVATE_KEY=your-private-key
     ```

3. **Install Vite (if needed)**  
   - If you encounter an error related to Vite, install it as a development dependency by running:
     ```bash
     npm install vite --save-dev
     ```

4. **Install Dependencies**  
   - Open a terminal in the project folder and run the following command to install the required packages:
     ```bash
     npm install
     ```

5. **Start the Development Server**  
   - Start the Vite development server by running:
     ```bash
     npm run dev
     ```
   - This will start a local server, and you will see a URL like `http://localhost:5173`. Open that URL in your browser to access the app.

5. **Explore the Marvel Universe**
   - You can now browse through the Home, Marvel Characters Gallery, and Marvel Comics Gallery to explore Marvel’s content.


## Notes

- Please don’t commit your `.env` file to version control. Add `.env` to your `.gitignore` file to keep your keys secure.  
- If you plan to deploy the app, make sure the `.env` file is set up properly in the deployment environment to access the API keys securely.

## Conclusion

Thank you for exploring the Marvel Universe Explorer! I hope it brought some excitement and fun by letting you dive into Marvel’s incredible world of heroes, villains, and creators. If it added even a little joy to your day, then it has accomplished its purpose.
