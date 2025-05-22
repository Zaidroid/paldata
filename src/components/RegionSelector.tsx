import React from 'react';
import { useData } from '../context/DataContext';

interface RegionSelectorProps {
  theme?: 'light' | 'dark';
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ theme = 'light' }) => {
  const { selectedRegion, setSelectedRegion } = useData();
  const [isOpen, setIsOpen] = React.useState(false);

  const regions = [
    { code: 'west-bank', name: 'West Bank' },
    { code: 'gaza', name: 'Gaza Strip' },
    { code: 'jerusalem', name: 'Jerusalem' },
  ];

  const handleSelect = (code: string) => {
    setSelectedRegion(code === 'all' ? null : code);
    setIsOpen(false);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all duration-300 
      ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <h3 className="font-semibold mb-3">Region</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-2 rounded border text-left flex justify-between items-center
            transition-colors duration-300 hover:border-palestine-red
            ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
        >
          <span>
            {selectedRegion 
              ? regions.find(r => r.code === selectedRegion)?.name || 'Unknown'
              : 'All Regions'}
          </span>
          <span className={`material-icons-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
        
        {isOpen && (
          <div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-auto
            ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}
          >
            <ul className="py-1">
              <li 
                onClick={() => handleSelect('all')}
                className={`px-3 py-2 cursor-pointer transition-colors duration-300
                  hover:bg-palestine-red hover:text-white
                  ${!selectedRegion 
                    ? 'bg-palestine-red text-white' 
                    : theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
              >
                All Regions
              </li>
              {regions.map((region) => (
                <li 
                  key={region.code}
                  onClick={() => handleSelect(region.code)}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300
                    hover:bg-palestine-red hover:text-white
                    ${selectedRegion === region.code 
                      ? 'bg-palestine-red text-white' 
                      : theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  {region.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;