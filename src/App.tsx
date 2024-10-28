import React from 'react';
import { SpotifyApiContext } from './context/spotify-api-context';
import { SpotifyApiService } from './service/spotify-api.service';
import { ImageExporterContext } from './context/image-exporter-context';
import { ImageExporterService } from './service/image-exporter.service';
import { ProcessedTracksContext } from './context/processed-tracks-context';
import { ProcessedTracksService } from './service/processed-tracks.service';
import { SpotifyScraper } from './components/SpotifyScraper';

function App() {
  return (
    <SpotifyApiContext.Provider value={new SpotifyApiService()}>
      <ImageExporterContext.Provider value={new ImageExporterService()}>
        <ProcessedTracksContext.Provider value={new ProcessedTracksService()}>
          <div className="App h-screen bg-gray-100">
            <SpotifyScraper />
          </div>
        </ProcessedTracksContext.Provider>
      </ImageExporterContext.Provider>
    </SpotifyApiContext.Provider>
  );
}

export default App;
