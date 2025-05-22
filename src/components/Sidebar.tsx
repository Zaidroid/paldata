import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, AlertTriangle, Map, Building, PieChart, Activity, BarChart2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  theme: 'light' | 'dark';
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, theme, closeSidebar }) => {
  const navLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/crime-justice', icon: <Activity size={20} />, label: 'Crime & Justice' },
    { to: '/martyrs', icon: <AlertTriangle size={20} />, label: 'Martyrs' },
    { to: '/land-use', icon: <Map size={20} />, label: 'Land Use' },
    { to: '/settlements', icon: <Building size={20} />, label: 'Settlements' },
    { to: '/drug-crimes', icon: <PieChart size={20} />, label: 'Drug Crimes' },
    { to: '/homicides', icon: <BarChart2 size={20} />, label: 'Homicides' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        />
      )}
      
      <aside 
        className={`fixed left-0 top-0 pt-16 h-full z-10 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          ${isOpen ? 'w-64' : 'w-0 md:w-16'} 
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <nav className="h-full overflow-y-auto pt-4">
          <ul className="space-y-2 px-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeSidebar}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-md transition-colors duration-200
                    ${isActive
                      ? theme === 'dark'
                        ? 'bg-green-700 text-white'
                        : 'bg-green-100 text-green-800'
                      : theme === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span className={`${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'} transition-opacity duration-200 whitespace-nowrap ${!isOpen && 'md:hidden'}`}>
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;