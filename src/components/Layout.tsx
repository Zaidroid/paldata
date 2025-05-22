import React, { ReactNode, useState } from 'react';
import { Home, BarChart2, Users, FileText, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegionSelector from './RegionSelector';
import SectorSelector from './SectorSelector';
import AddWidget from './AddWidget';

interface LayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const [aiInsightsEnabled, setAiInsightsEnabled] = React.useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [showSectorSelector, setShowSectorSelector] = useState(false);

  return (
    <div className="flex min-h-screen font-poppins">
      <aside className="w-20 bg-palestine-white dark:bg-dark-surface p-4 flex flex-col items-center space-y-6 shadow-lg">
        <div className="w-12 h-12 bg-palestine-red rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
          <span className="material-icons-outlined text-palestine-white text-3xl">insights</span>
        </div>
        
        <nav className="flex flex-col space-y-4 mt-8">
          <Link to="/" className="sidebar-icon p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary transform transition-all duration-300 hover:scale-110">
            <Home size={20} />
          </Link>
          <Link to="/crime-justice" className="sidebar-icon p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary transform transition-all duration-300 hover:scale-110">
            <BarChart2 size={20} />
          </Link>
          <Link to="/martyrs" className="sidebar-icon p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary transform transition-all duration-300 hover:scale-110">
            <Users size={20} />
          </Link>
          <Link to="/land-use" className="sidebar-icon p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary transform transition-all duration-300 hover:scale-110">
            <FileText size={20} />
          </Link>
          <Link to="/settlements" className="sidebar-icon p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary transform transition-all duration-300 hover:scale-110">
            <Settings size={20} />
          </Link>
        </nav>
        
        <div className="mt-auto">
          <button className="sidebar-icon p-3 rounded-lg text-text-secondary dark:text-dark-text-secondary transform transition-all duration-300 hover:scale-110">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 bg-light-gray dark:bg-dark-bg">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary dark:text-dark-text-primary">Palestine Data Overview</h1>
            <p className="text-text-secondary dark:text-dark-text-secondary">Interactive insights and statistics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="theme-switch-wrapper">
              <label className="theme-switch" htmlFor="theme-toggle">
                <input 
                  id="theme-toggle" 
                  type="checkbox" 
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <button className="p-2 rounded-full hover:bg-medium-gray dark:hover:bg-dark-hover transition-transform duration-300 hover:scale-110">
              <span className="material-icons-outlined text-text-secondary dark:text-dark-text-secondary">search</span>
            </button>

            <button className="p-2 rounded-full hover:bg-medium-gray dark:hover:bg-dark-hover transition-transform duration-300 hover:scale-110 relative">
              <span className="material-icons-outlined text-text-secondary dark:text-dark-text-secondary">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-palestine-red rounded-full"></span>
            </button>

            <div className="flex items-center space-x-2 bg-palestine-white dark:bg-dark-surface px-3 py-2 rounded-lg shadow transform transition-all duration-300 hover:scale-105">
              <span className="material-icons-outlined text-palestine-red text-sm">calendar_today</span>
              <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        <div className="mb-8 flex items-center space-x-4">
          <button className="bg-palestine-red text-palestine-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 hover:scale-105 flex items-center">
            <span className="material-icons-outlined mr-2 text-lg">dashboard</span> Dashboards
          </button>
          
          <button 
            onClick={() => setShowRegionSelector(!showRegionSelector)}
            className="bg-palestine-white dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-300 hover:scale-105 flex items-center"
          >
            <span className="material-icons-outlined mr-2 text-lg">map</span> Regions
          </button>
          
          <button 
            onClick={() => setShowSectorSelector(!showSectorSelector)}
            className="bg-palestine-white dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-300 hover:scale-105 flex items-center"
          >
            <span className="material-icons-outlined mr-2 text-lg">category</span> Sectors
          </button>

          <div className="flex items-center space-x-2 bg-palestine-white dark:bg-dark-surface px-3 py-1.5 rounded-lg shadow-md ml-4 transform transition-all duration-300 hover:scale-105">
            <span className="material-icons-outlined text-ai-purple text-lg">auto_awesome</span>
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">AI Insights</span>
            <label className="ai-insights-toggle">
              <input
                type="checkbox"
                checked={aiInsightsEnabled}
                onChange={(e) => setAiInsightsEnabled(e.target.checked)}
              />
              <span className="ai-slider round"></span>
            </label>
          </div>

          <button 
            onClick={() => setShowAddWidget(true)}
            className="ml-auto bg-palestine-green text-palestine-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 hover:scale-105 flex items-center"
          >
            <span className="material-icons-outlined mr-2 text-lg">add</span> Add Widget
          </button>
        </div>

        {showRegionSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-96">
              <RegionSelector theme={theme} />
            </div>
          </div>
        )}

        {showSectorSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-96">
              <SectorSelector theme={theme} />
            </div>
          </div>
        )}

        {showAddWidget && (
          <AddWidget theme={theme} onClose={() => setShowAddWidget(false)} />
        )}

        <div className={`${aiInsightsEnabled ? 'ai-insights-active' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;