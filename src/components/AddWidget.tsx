import React, { useState } from 'react';
import { useData } from '../context/DataContext';

interface AddWidgetProps {
  theme?: 'light' | 'dark';
  onClose: () => void;
}

const AddWidget: React.FC<AddWidgetProps> = ({ theme = 'light', onClose }) => {
  const { data } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'demographics', name: 'Demographics', icon: 'groups' },
    { id: 'education', name: 'Education', icon: 'school' },
    { id: 'health', name: 'Health', icon: 'local_hospital' },
    { id: 'economy', name: 'Economy', icon: 'trending_up' },
    { id: 'agriculture', name: 'Agriculture', icon: 'grass' },
    { id: 'environment', name: 'Environment', icon: 'eco' },
  ];

  const availableWidgets = [
    {
      id: 'population-pyramid',
      name: 'Population Pyramid',
      description: 'Age and gender distribution of the population',
      category: 'demographics',
      icon: 'analytics',
    },
    {
      id: 'education-enrollment',
      name: 'Education Enrollment',
      description: 'Student enrollment rates by education level',
      category: 'education',
      icon: 'school',
    },
    // Add more widgets based on available data
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-black/50' : 'bg-gray-600/50'}`}>
      <div className={`relative w-full max-w-2xl rounded-lg shadow-xl 
        ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add Widget</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
            >
              <span className="material-icons-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-palestine-red text-white border-palestine-red'
                    : 'hover:border-palestine-red hover:text-palestine-red'
                  }`}
              >
                <span className="material-icons-outlined text-2xl mb-2">{category.icon}</span>
                <p>{category.name}</p>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {availableWidgets
              .filter(widget => !selectedCategory || widget.category === selectedCategory)
              .map((widget) => (
                <div
                  key={widget.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300
                    hover:border-palestine-red hover:shadow-md
                    ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <span className="material-icons-outlined text-2xl mr-3 text-palestine-red">
                      {widget.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold">{widget.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {widget.description}
                      </p>
                    </div>
                    <button className="ml-auto bg-palestine-red text-white px-3 py-1 rounded
                      transition-all duration-300 hover:bg-red-700">
                      Add
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidget;