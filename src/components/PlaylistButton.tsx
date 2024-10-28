import React from 'react';

interface PlaylistButtonProps {
  playlist: {
    id: string;
    name: string;
  };
  onClick: (playlistId: string) => void;
}

export const PlaylistButton: React.FC<PlaylistButtonProps> = ({ playlist, onClick }) => {
  return (
    <button
      className="border border-green-600 block w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white transition duration-300 ease-in-out"
      onClick={() => onClick(playlist.id)}
    >
      {playlist.name}
    </button>
  );
};
