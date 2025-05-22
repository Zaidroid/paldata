import React from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import YearRangeSlider from '../components/YearRangeSlider';

const Martyrs: React.FC = () => {
  const { data, loading, yearRange } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const filteredYears = data.alAqsaIntifadaMartyrs.years
    .filter(item => item.year >= yearRange[0] && item.year <= yearRange[1]);

  const martyrsData = {
    labels: filteredYears.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Number of Martyrs',
        data: filteredYears.map(item => item.count),
        backgroundColor: 'rgba(220, 38, 38, 0.8)',
        borderColor: 'rgba(220, 38, 38, 1)',
        borderWidth: 1,
      }
    ]
  };

  const martyrsLineData = {
    labels: filteredYears.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Martyrs',
        data: filteredYears.map(item => item.count),
        borderColor: 'rgba(220, 38, 38, 1)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.1,
      }
    ]
  };

  // Calculate statistics
  const totalMartyrs = data.alAqsaIntifadaMartyrs.total;
  const avgMartyrsPerYear = Math.round(totalMartyrs / data.alAqsaIntifadaMartyrs.years.length);
  const maxYear = data.alAqsaIntifadaMartyrs.years.reduce((max, year) => 
    year.count > max.count ? year : max, data.alAqsaIntifadaMartyrs.years[0]);
  const totalInRange = filteredYears.reduce((total, year) => total + year.count, 0);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Al-Aqsa Intifada Martyrs</h1>
      
      <div className="mb-6">
        <DashboardCard title={data.alAqsaIntifadaMartyrs.title_en}>
          <p className="mb-4 italic text-sm text-gray-600 dark:text-gray-400">
            {data.alAqsaIntifadaMartyrs.data_note_en}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Total Martyrs</h3>
              <p className="text-3xl font-bold text-red-600">{totalMartyrs.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Avg. Per Year</h3>
              <p className="text-3xl font-bold text-red-600">{avgMartyrsPerYear.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Highest Year</h3>
              <p className="text-3xl font-bold text-red-600">{maxYear.year} <span className="text-xl">({maxYear.count})</span></p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Selected Range</h3>
              <p className="text-3xl font-bold text-red-600">{totalInRange.toLocaleString()}</p>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <DashboardCard title="Martyrs by Year">
            <BarChart 
              title="" 
              data={martyrsData} 
            />
          </DashboardCard>
        </div>
        <div>
          <YearRangeSlider />
          
          <div className="mt-6">
            <DashboardCard title="Significant Years">
              <div className="space-y-4">
                {[2000, 2002, 2008, 2009, 2014].map(year => {
                  const yearData = data.alAqsaIntifadaMartyrs.years.find(item => item.year === year);
                  return yearData ? (
                    <div key={year} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{year}</p>
                        {yearData.note && <p className="text-xs text-gray-500">{yearData.note}</p>}
                      </div>
                      <div className="text-xl font-bold text-red-600">{yearData.count}</div>
                    </div>
                  ) : null;
                })}
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <DashboardCard title="Martyrs Trend Over Time">
          <LineChart 
            title="" 
            data={martyrsLineData} 
          />
        </DashboardCard>
      </div>
      
      <div className="mb-8">
        <DashboardCard title="Timeline of Major Events">
          <div className="relative border-l-2 border-red-500 pl-8 py-4 ml-6">
            <div className="mb-8">
              <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">1</span>
              </div>
              <h3 className="text-lg font-semibold">September 2000 - Start of the Second Intifada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                The Second Intifada began after Ariel Sharon's controversial visit to the Temple Mount/Al-Aqsa Mosque compound.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">2</span>
              </div>
              <h3 className="text-lg font-semibold">2002 - Operation Defensive Shield</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Israel launched a large-scale military operation in the West Bank, resulting in a significant number of casualties.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
              <h3 className="text-lg font-semibold">2008-2009 - Gaza War (Operation Cast Lead)</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Israeli military operation in Gaza led to over 1,400 Palestinian casualties.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">4</span>
              </div>
              <h3 className="text-lg font-semibold">2014 - Gaza War (Operation Protective Edge)</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Military operation in Gaza resulting in the highest number of Palestinian casualties in a single year.
              </p>
            </div>
            
            <div>
              <div className="absolute -left-3 mt-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">5</span>
              </div>
              <h3 className="text-lg font-semibold">2021 - Gaza-Israel Conflict</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Escalation of violence between Israel and Hamas resulted in significant casualties.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Martyrs;