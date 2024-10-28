import React from 'react';
import { IProcessedTracksService } from '../service/processed-tracks.service.requirements';
import { ProcessedTracksService } from '../service/processed-tracks.service';

export const ProcessedTracksContext = React.createContext<IProcessedTracksService>(new ProcessedTracksService());