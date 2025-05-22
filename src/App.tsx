import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CrimeJustice from './pages/CrimeJustice';
import Martyrs from './pages/Martyrs';
import LandUse from './pages/LandUse';
import Settlements from './pages/Settlements';
import DrugCrimes from './pages/DrugCrimes';
import Homicides from './pages/Homicides';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <DataProvider>
        <Router>
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crime-justice" element={<CrimeJustice />} />
              <Route path="/martyrs" element={<Martyrs />} />
              <Route path="/land-use" element={<LandUse />} />
              <Route path="/settlements" element={<Settlements />} />
              <Route path="/drug-crimes" element={<DrugCrimes />} />
              <Route path="/homicides" element={<Homicides />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;