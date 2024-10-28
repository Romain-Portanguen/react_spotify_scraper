import { Track } from '../types/track';

export interface ISpotifyApiService {
    fetchTracks(playlistId: string): Promise<Track[]>;
}
