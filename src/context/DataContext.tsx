import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import palestineData from '../data/palestine-data-combined.json';

interface DataContextType {
  data: any; // Using any temporarily while we integrate the new data structure
  loading: boolean;
  error: string | null;
  yearRange: [number, number];
  setYearRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedGovernorate: string | null;
  setSelectedGovernorate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSector: string | null;
  setSelectedSector: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRegion: string | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number, number]>([1996, 2023]);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const value = {
    data: palestineData,
    loading,
    error,
    yearRange,
    setYearRange,
    selectedGovernorate,
    setSelectedGovernorate,
    selectedSector,
    setSelectedSector,
    selectedRegion,
    setSelectedRegion
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};