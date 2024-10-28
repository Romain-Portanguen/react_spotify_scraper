import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 border-t-2 border-green-600">
      <p>© {new Date().getFullYear()} Spotify Scraper. All rights reserved.</p>
      <p>
        <a href="https://github.com/Romain-Portanguen/react_spotify_scraper" target="_blank" rel="noopener noreferrer" className="text-spotifyGreen">
          GitHub Repository
        </a>
      </p>
    </footer>
  );
};
