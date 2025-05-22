import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

interface YearRangeSliderProps {
  theme?: 'light' | 'dark';
}

const YearRangeSlider: React.FC<YearRangeSliderProps> = ({ theme = 'light' }) => {
  const { yearRange, setYearRange } = useData();
  const [localRange, setLocalRange] = useState<[number, number]>(yearRange);

  useEffect(() => {
    setLocalRange(yearRange);
  }, [yearRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalRange([Math.min(value, localRange[1] - 1), localRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalRange([localRange[0], Math.max(value, localRange[0] + 1)]);
  };

  const handleApply = () => {
    setYearRange(localRange);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all duration-300 
      ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <h3 className="font-semibold mb-3">Year Range</h3>
      <div className="flex justify-between mb-2">
        <span>{localRange[0]}</span>
        <span>{localRange[1]}</span>
      </div>
      <div className="relative mb-4 h-2">
        <div 
          className={`absolute w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
        ></div>
        <div 
          className="absolute h-2 rounded-full bg-green-500"
          style={{
            left: `${((localRange[0] - 1996) / (2023 - 1996)) * 100}%`,
            width: `${((localRange[1] - localRange[0]) / (2023 - 1996)) * 100}%`
          }}
        ></div>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            From
          </label>
          <input
            type="number"
            min={1996}
            max={2023 - 1}
            value={localRange[0]}
            onChange={handleMinChange}
            className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
          />
        </div>
        <div className="flex-1">
          <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            To
          </label>
          <input
            type="number"
            min={1996 + 1}
            max={2023}
            value={localRange[1]}
            onChange={handleMaxChange}
            className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
      >
        Apply
      </button>
    </div>
  );
};

export default YearRangeSlider;