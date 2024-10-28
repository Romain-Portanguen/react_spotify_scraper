import React from 'react';
import { ISpotifyApiService } from '../service/spotify-api.service.requirements';
import { SpotifyApiService } from '../service/spotify-api.service';

export const SpotifyApiContext = React.createContext<ISpotifyApiService>(new SpotifyApiService());