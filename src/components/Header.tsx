import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Download, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar, sidebarOpen }) => {
  const { loading } = useData();
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <header className={`sticky top-0 z-10 px-4 py-3 flex items-center justify-between shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className={`p-2 rounded-full hover:bg-opacity-10 ${theme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="text-red-600">P</span>
          <span className="text-green-600">A</span>
          <span className="text-black dark:text-white">L</span>
          <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'} ml-2`}>
            Palestine Data
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        {showSearch ? (
          <div className={`relative transition-all duration-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
            <input 
              type="text" 
              placeholder="Search..." 
              className={`py-1 px-3 pr-8 outline-none rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
            <Search size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        ) : (
          <button 
            onClick={() => setShowSearch(true)}
            className={`p-2 rounded-full hover:bg-opacity-10 ${theme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        )}
        
        <button 
          onClick={() => {}}
          className={`p-2 rounded-full hover:bg-opacity-10 ${theme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}
          aria-label="Download data"
        >
          <Download size={20} />
        </button>
        
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full hover:bg-opacity-10 ${theme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}
          aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;