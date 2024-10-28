import axios from 'axios';

import { ISpotifyApiService } from './spotify-api.service.requirements';
import { Track } from '../types/track';

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_PLAYLIST_URL = "https://api.spotify.com/v1/playlists";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || "";
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "";

export class SpotifyApiService implements ISpotifyApiService {
    private accessToken: string | null = null;

    private async getNewAccessToken() {
        const authHeader = btoa(`${clientId}:${clientSecret}`);
        const response = await axios.post(SPOTIFY_TOKEN_URL,
            new URLSearchParams({ grant_type: 'client_credentials' }), {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
        this.accessToken = response.data.access_token;
        return this.accessToken;
    }

    public async fetchTracks(playlistId: string): Promise<Track[]> {
        if (!this.accessToken) {
            await this.getNewAccessToken();
        }

        try {
            const response = await axios.get(`${SPOTIFY_PLAYLIST_URL}/${playlistId}/tracks`, {
                headers: { Authorization: `Bearer ${this.accessToken}` },
            });

            return response.data.items.map((item: any) => {
                const track = item.track;
                return {
                    title: track.name,
                    artist: track.artists.map((artist: any) => artist.name).join(', '),
                    duration_ms: track.duration_ms,
                } as Track;
            });
        } catch (error) {
            console.error('Error fetching tracks:', error);
            return [];
        }
    }
}
