import React from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import YearRangeSlider from '../components/YearRangeSlider';
import GovernorateSelector from '../components/GovernorateSelector';

const DrugCrimes: React.FC = () => {
  const { data, loading, yearRange, selectedGovernorate } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const years = Object.keys(data.reportedDrugCrimesByGovernorate[0])
    .filter(key => !isNaN(parseInt(key)) && parseInt(key) >= yearRange[0] && parseInt(key) <= yearRange[1])
    .sort((a, b) => parseInt(a) - parseInt(b));
  
  // Get all governorates (excluding 'Total')
  const governorates = data.reportedDrugCrimesByGovernorate
    .map(item => ({ code: item.governorate_en.toLowerCase().replace(/\s+/g, ''), name: item.governorate_en }));
  
  // Prepare data for the line chart - total drug crimes
  const drugCrimesOverall = {
    labels: years,
    datasets: [
      {
        label: 'Reported Drug Crimes',
        data: years.map(year => {
          const stats = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Reported Drug Crimes'
          );
          return stats ? stats[year as keyof typeof stats] as number : null;
        }),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.2,
      }
    ]
  };
  
  // Prepare data for bar chart by governorate
  const latestYear = years[years.length - 1];
  const prevYear = years[years.length - 2];
  
  const governorateData = {
    labels: data.reportedDrugCrimesByGovernorate.map(item => item.governorate_en),
    datasets: [
      {
        label: `${latestYear}`,
        data: data.reportedDrugCrimesByGovernorate.map(item => {
          return item[latestYear as keyof typeof item] as number | null;
        }),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: `${prevYear}`,
        data: data.reportedDrugCrimesByGovernorate.map(item => {
          return item[prevYear as keyof typeof item] as number | null;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };
  
  // Get data for selected governorate or all governorates
  const selectedGovData = selectedGovernorate 
    ? data.reportedDrugCrimesByGovernorate.find(item => 
        item.governorate_en.toLowerCase().replace(/\s+/g, '') === selectedGovernorate
      )
    : null;
  
  const selectedGovernorateData = {
    labels: years,
    datasets: [
      {
        label: selectedGovData ? selectedGovData.governorate_en : 'All Governorates',
        data: years.map(year => {
          if (selectedGovData) {
            return selectedGovData[year as keyof typeof selectedGovData] as number | null;
          } else {
            // Sum all governorates for that year
            return data.reportedDrugCrimesByGovernorate.reduce((sum, gov) => {
              const val = gov[year as keyof typeof gov] as number | null;
              return val ? sum + val : sum;
            }, 0);
          }
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Drug Crimes in Palestine</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <DashboardCard title="Reported Drug Crimes Over Time">
            <LineChart 
              title="" 
              data={drugCrimesOverall} 
            />
          </DashboardCard>
        </div>
        <div className="space-y-6">
          <YearRangeSlider />
          <GovernorateSelector />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardCard title={`Drug Crimes in ${selectedGovData ? selectedGovData.governorate_en : 'All Governorates'}`}>
          <BarChart 
            title="" 
            data={selectedGovernorateData} 
          />
        </DashboardCard>
        
        <DashboardCard title={`Drug Crimes by Governorate (${prevYear} vs ${latestYear})`}>
          <BarChart 
            title="" 
            data={governorateData} 
            horizontal={true}
            height={400}
          />
        </DashboardCard>
      </div>
      
      <div className="mb-8">
        <DashboardCard title="Drug Crimes by Governorate and Year">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Governorate</th>
                  {years.map(year => (
                    <th key={year} className="px-4 py-2 text-right">{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.reportedDrugCrimesByGovernorate.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`
                      ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                      ${selectedGovernorate === item.governorate_en.toLowerCase().replace(/\s+/g, '') 
                        ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
                    `}
                  >
                    <td className="px-4 py-2 font-medium">{item.governorate_en}</td>
                    {years.map(year => (
                      <td key={year} className="px-4 py-2 text-right">
                        {item[year as keyof typeof item] !== null 
                          ? (item[year as keyof typeof item] as number).toLocaleString() 
                          : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DrugCrimes;