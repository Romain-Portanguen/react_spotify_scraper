import React, { useCallback } from 'react';

interface RefetchButtonProps {
  onRefetch: () => void;
}

export const RefetchButton: React.FC<RefetchButtonProps> = ({ onRefetch }) => {
  const handleRefetch = useCallback(() => {
    onRefetch();
  }, [onRefetch]);

  return (
    <button
      onClick={handleRefetch}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-800 transition duration-300"
    >
      Refetch Playlist
    </button>
  );
};
