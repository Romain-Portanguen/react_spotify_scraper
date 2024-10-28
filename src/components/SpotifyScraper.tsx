import React, { useCallback, useContext, useMemo, useState } from 'react';
import { PlaylistButton } from './PlaylistButton';
import { TracksTable } from './TracksTable';
import { Track } from '../types/track';
import { SpotifyApiContext } from '../context/spotify-api-context';
import { ISpotifyApiService } from '../service/spotify-api.service.requirements';
import { ProcessedTracksContext } from '../context/processed-tracks-context';
import { IProcessedTracksService } from '../service/processed-tracks.service.requirements';
import { ExportButton } from './ExportButton';
import { Loader } from './Loader';
import { Footer } from './Footer';
import { RefetchButton } from './RefetchButton';

interface Playlist {
  id: string;
  name: string;
}

const playlists: Playlist[] = [
  { id: process.env.REACT_APP_PLAYLIST_DARK_FORMS_ELECTRONICA_ID || '', name: 'Dark Forms Electronica' },
  { id: process.env.REACT_APP_PLAYLIST_SYNTH_DEVILS_ID || '', name: 'Synth Devils' }
];

export const SpotifyScraper: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const spotifyApiService = useContext<ISpotifyApiService>(SpotifyApiContext);
  const processedTracksService = useContext<IProcessedTracksService>(ProcessedTracksContext);

  const handlePlaylistClick = useCallback(async (playlistId: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedPlaylist(playlistId);
    try {
      const fetchedTracks = await spotifyApiService.fetchTracks(playlistId);

      const processedTracks = processedTracksService.calculatePlayedTimes(
        fetchedTracks.map((track) => ({
          added_at: new Date(track.added_at),
          title: track.title,
          artist: track.artist,
          duration_ms: track.duration_ms,
        }))
      );

      if (processedTracks.length === 0) {
        setError('No valid tracks found for this playlist.');
      } else {
        setTracks(processedTracks);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tracks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [spotifyApiService, processedTracksService]);

  const handleRefetch = useCallback(() => {
    if (selectedPlaylist) {
      handlePlaylistClick(selectedPlaylist);
    }
  }, [handlePlaylistClick, selectedPlaylist]);

  const currentPlaylistName = useMemo(() =>
    playlists.find(playlist => playlist.id === selectedPlaylist)?.name || 'Playlist Tracks',
    [selectedPlaylist]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full" id='loader-container'>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <p className="text-red-600 font-semibold">{error}</p>;
    }

    if (tracks.length > 0) {
      return (
        <TracksTable tracks={tracks} />
      );
    }

    return <p className="text-green-300">Select a playlist to see tracks.</p>;
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-1">
        <aside className="flex flex-col w-1/4 bg-gray-800 to-gray-900 text-white p-5 shadow-lg border-r-2 border-green-600">
          <h2 className="text-3xl font-bold mb-6 text-spotifyGreen">Playlists</h2>
          <div className="flex flex-col items-center justify-center gap-2">
            {playlists.map((playlist) => (
              <PlaylistButton
                key={playlist.id}
                playlist={playlist}
                onClick={() => handlePlaylistClick(playlist.id)}
              />
            ))}
          </div>
          {selectedPlaylist ? (
            <>
              <ExportButton targetId="recently-played-tracks" />
              <RefetchButton onRefetch={handleRefetch} />
            </>
          ) : null}
        </aside>

        <div className="flex-1 p-6 bg-gray-800 shadow-md overflow-y-auto">
          <h2 className="mb-6 text-3xl font-bold text-green-600">{currentPlaylistName}</h2>
          {renderContent()}
        </div>
      </div>

      <div className="w-full bg-gray-800 text-white">
        <Footer />
      </div>
    </div>
  );
};
