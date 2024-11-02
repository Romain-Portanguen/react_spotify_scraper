import React from 'react';

interface SetStartHourInputProps {
  value: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SetStartHourInput: React.FC<SetStartHourInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="start-hour" className="block text-sm font-semibold text-gray-300 text-left mb-2">
        Start Hour
      </label>
      <div className="relative">
        <input
          type="number"
          name="start-hour"
          id="start-hour"
          min="0"
          max="23"
          value={value ?? ''}
          onChange={onChange}
          className="w-full p-3 border border-green-600 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition duration-200"
          placeholder="Set the start hour (0-23)"
        />
      </div>
    </div>
  );
};
