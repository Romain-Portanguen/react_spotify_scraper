import { Track } from "../types/track";

export interface IProcessedTracksService {
  calculatePlayedTimes(tracks: Track[], useRandomStartTime?: boolean, startTime?: Date): Track[];
}
