# TinyURL

A mini web application to generate and manage short URLs.

## Features

- **Add a new URL**: Enter a long URL and automatically generate a short version (tiny URL).
- **View all URLs**: See a list of all created URLs in the user interface.
- **Open original link**: Access the original link by clicking the short version.
- **Consistent short URLs**: If the same URL is entered again, the same short version is returned.
- **Minimal UI**: Simple and clean interface for easy interaction.

## How It Works

1. **Add URL**: Submit a long URL using the form. The backend generates a unique short code and stores the mapping.
2. **List URLs**: All created URLs are displayed in a list, showing both the original and short versions.
3. **Redirect**: Clicking a short URL redirects to the original link.
4. **Duplicate Handling**: If a URL already exists, the same short code is returned.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/venetak/tiny-url.git
   cd tiny-url
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- Node.js
- Express (backend)
- React (frontend)
- TypeScript

## Folder Structure

- `/backend` - Express server for URL management and redirection
- `/frontend` - React app for user interface

## Example

| Original URL                | Tiny URL           |
|----------------------------|--------------------|
| https://www.example.com    | http://localhost:3000/abc123 |

## License

MIT
