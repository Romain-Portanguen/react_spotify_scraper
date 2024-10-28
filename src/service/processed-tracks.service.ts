import { Track } from "../types/track";
import { IProcessedTracksService } from "./processed-tracks.service.requirements";
import { generateRandomStartTime } from "../utils/time-utils";

export class ProcessedTracksService implements IProcessedTracksService {
  public calculatePlayedTimes(
    tracks: Track[],
    useRandomStartTime = true,
    startTime?: Date
  ): Track[] {
    const sortedTracks = tracks.sort((a, b) => 
      new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
    );

    const reversedTracks = [...sortedTracks].reverse();

    const initialStartTime = startTime || new Date();
    const newStartTime = useRandomStartTime
      ? generateRandomStartTime(initialStartTime)
      : initialStartTime;

    reversedTracks[0].new_played_at = newStartTime;

    for (let i = 1; i < reversedTracks.length; i++) {
      const previousTrack = reversedTracks[i - 1];
      const duration = previousTrack.duration_ms;
      const previousPlayedAt = previousTrack.new_played_at;

      if (previousPlayedAt) {
        reversedTracks[i].new_played_at = new Date(previousPlayedAt.getTime() - duration);
      }
    }

    return reversedTracks.map(track => ({
      ...track,
      playedAt: track.new_played_at
        ? `${track.new_played_at.toLocaleDateString()} ${track.new_played_at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : 'N/A',
    }));
  }
}
