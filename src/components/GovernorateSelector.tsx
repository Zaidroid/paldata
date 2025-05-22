import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface GovernorateSelectorProps {
  theme?: 'light' | 'dark';
}

const GovernorateSelector: React.FC<GovernorateSelectorProps> = ({ theme = 'light' }) => {
  const { selectedGovernorate, setSelectedGovernorate } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const governorates = [
    { code: 'jenin', name_en: 'Jenin', name_ar: 'جنين' },
    { code: 'tubas', name_en: 'Tubas', name_ar: 'طوباس' },
    { code: 'tulkarm', name_en: 'Tulkarm', name_ar: 'طولكرم' },
    { code: 'nablus', name_en: 'Nablus', name_ar: 'نابلس' },
    { code: 'qalqilya', name_en: 'Qalqilya', name_ar: 'قلقيلية' },
    { code: 'salfit', name_en: 'Salfit', name_ar: 'سلفيت' },
    { code: 'ramallah', name_en: 'Ramallah & Al-Bireh', name_ar: 'رام الله والبيرة' },
    { code: 'jericho', name_en: 'Jericho & The Jordan Valley', name_ar: 'أريحا والأغوار' },
    { code: 'jerusalem', name_en: 'Jerusalem', name_ar: 'القدس' },
    { code: 'bethlehem', name_en: 'Bethlehem', name_ar: 'بيت لحم' },
    { code: 'hebron', name_en: 'Hebron', name_ar: 'الخليل' },
  ];

  const handleSelect = (code: string) => {
    setSelectedGovernorate(code === 'all' ? null : code);
    setIsOpen(false);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all duration-300 
      ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <h3 className="font-semibold mb-3">Governorate</h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-2 rounded border text-left flex justify-between items-center
            ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
        >
          <span>
            {selectedGovernorate 
              ? governorates.find(g => g.code === selectedGovernorate)?.name_en || 'Unknown'
              : 'All Governorates'}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className={`absolute z-10 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-auto
            ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}
          >
            <ul className="py-1">
              <li 
                onClick={() => handleSelect('all')}
                className={`px-3 py-2 cursor-pointer hover:bg-green-100 hover:text-green-800
                  ${!selectedGovernorate 
                    ? 'bg-green-100 text-green-800' 
                    : theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
              >
                All Governorates
              </li>
              {governorates.map((governorate) => (
                <li 
                  key={governorate.code}
                  onClick={() => handleSelect(governorate.code)}
                  className={`px-3 py-2 cursor-pointer hover:bg-green-100 hover:text-green-800
                    ${selectedGovernorate === governorate.code 
                      ? 'bg-green-100 text-green-800' 
                      : theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  {governorate.name_en}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernorateSelector;