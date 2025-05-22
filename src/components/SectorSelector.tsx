import React from 'react';
import { useData } from '../context/DataContext';

interface SectorSelectorProps {
  theme?: 'light' | 'dark';
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ theme = 'light' }) => {
  const { selectedSector, setSelectedSector } = useData();
  const [isOpen, setIsOpen] = React.useState(false);

  const sectors = [
    { code: 'demographics', name: 'Demographics' },
    { code: 'education', name: 'Education' },
    { code: 'health', name: 'Health' },
    { code: 'economy', name: 'Economy' },
    { code: 'agriculture', name: 'Agriculture' },
    { code: 'environment', name: 'Environment' },
  ];

  const handleSelect = (code: string) => {
    setSelectedSector(code === 'all' ? null : code);
    setIsOpen(false);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all duration-300 
      ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <h3 className="font-semibold mb-3">Sector</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-2 rounded border text-left flex justify-between items-center
            transition-colors duration-300 hover:border-palestine-green
            ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
        >
          <span>
            {selectedSector 
              ? sectors.find(s => s.code === selectedSector)?.name || 'Unknown'
              : 'All Sectors'}
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
                  hover:bg-palestine-green hover:text-white
                  ${!selectedSector 
                    ? 'bg-palestine-green text-white' 
                    : theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
              >
                All Sectors
              </li>
              {sectors.map((sector) => (
                <li 
                  key={sector.code}
                  onClick={() => handleSelect(sector.code)}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300
                    hover:bg-palestine-green hover:text-white
                    ${selectedSector === sector.code 
                      ? 'bg-palestine-green text-white' 
                      : theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  {sector.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorSelector;