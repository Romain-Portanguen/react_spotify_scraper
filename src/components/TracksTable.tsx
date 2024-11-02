import React from 'react';
import '../styles/TracksTable.css';
import { Track } from '../types/track';

interface TracksTableProps {
  tracks: Track[];
}

export const TracksTable: React.FC<TracksTableProps> = ({ tracks }) => {
  return (
    <div className="recently-played-container">
      <table id="recently-played-tracks">
        <thead>
          <tr>
            <th>Track</th>
            <th>Artist(s)</th>
            <th>Played at</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr key={index}>
              <td>{track.title}</td>
              <td>{track.artist}</td>
              <td>{track.playedAt || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
