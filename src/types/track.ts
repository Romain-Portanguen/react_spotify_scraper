export interface Track {
  added_at: string | number | Date;
  artist: string;
  duration_ms: number; 
  new_played_at?: Date; 
  playedAt?: string; 
  title: string;
}
