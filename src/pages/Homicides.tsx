import React from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import YearRangeSlider from '../components/YearRangeSlider';
import GovernorateSelector from '../components/GovernorateSelector';

const Homicides: React.FC = () => {
  const { data, loading, yearRange, selectedGovernorate } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const years = Object.keys(data.homicideAttemptedHomicideByGovernorate[0])
    .filter(key => !isNaN(parseInt(key)) && parseInt(key) >= yearRange[0] && parseInt(key) <= yearRange[1])
    .sort((a, b) => parseInt(a) - parseInt(b));
  
  // Prepare data for overall homicides over time
  const homicidesOverall = {
    labels: years,
    datasets: [
      {
        label: 'Homicide & Attempted Homicide',
        data: years.map(year => {
          const stats = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Reported Homicide and Attempted Homicide'
          );
          return stats ? stats[year as keyof typeof stats] as number : null;
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,
      }
    ]
  };
  
  // Get data for selected governorate
  const selectedGovData = selectedGovernorate 
    ? data.homicideAttemptedHomicideByGovernorate.find(item => 
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
            return data.homicideAttemptedHomicideByGovernorate.reduce((sum, gov) => {
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
  
  // Gender breakdown data for a specific year (using the latest available year)
  // Find the latest year with gender breakdown data
  const homicideYearsWithGender = [...new Set(data.homicidesByGovernorateSexYear.map(item => item.year))].sort();
  const latestYearWithGender = homicideYearsWithGender[homicideYearsWithGender.length - 1];
  
  // Get total male/female counts for the latest year
  const maleTotal = data.homicidesByGovernorateSexYear.find(
    item => item.year === latestYearWithGender && 
    item.governorate_en === 'Total' && 
    item.sex_en === 'Male'
  );
  
  const femaleTotal = data.homicidesByGovernorateSexYear.find(
    item => item.year === latestYearWithGender && 
    item.governorate_en === 'Total' && 
    item.sex_en === 'Female'
  );
  
  const genderBreakdownData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Homicides by Gender',
        data: [
          maleTotal ? maleTotal.count : 0,
          femaleTotal ? femaleTotal.count : 0
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };
  
  // Get governorate data for the latest year with gender data
  const governorateHomicideData = data.homicidesByGovernorateSexYear
    .filter(item => 
      item.year === latestYearWithGender && 
      item.governorate_en !== 'Total' && 
      item.sex_en === 'Both'
    )
    .sort((a, b) => b.count - a.count);
  
  const governorateBreakdownData = {
    labels: governorateHomicideData.map(item => item.governorate_en),
    datasets: [
      {
        label: `Homicides (${latestYearWithGender})`,
        data: governorateHomicideData.map(item => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Homicides in Palestine</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <DashboardCard title="Homicide & Attempted Homicide Over Time">
            <LineChart 
              title="" 
              data={homicidesOverall} 
            />
          </DashboardCard>
        </div>
        <div className="space-y-6">
          <YearRangeSlider />
          <GovernorateSelector />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardCard title={`Homicides in ${selectedGovData ? selectedGovData.governorate_en : 'All Governorates'}`}>
          <BarChart 
            title="" 
            data={selectedGovernorateData} 
          />
        </DashboardCard>
        
        <DashboardCard title={`Homicide Gender Breakdown (${latestYearWithGender})`}>
          <div className="flex flex-col items-center justify-center h-full">
            <PieChart 
              title="" 
              data={genderBreakdownData} 
              height={250}
            />
            <div className="mt-4 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{maleTotal ? maleTotal.count : 0}</p>
                <p className="text-sm text-gray-500">Male</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-600">{femaleTotal ? femaleTotal.count : 0}</p>
                <p className="text-sm text-gray-500">Female</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="mb-6">
        <DashboardCard title={`Homicides by Governorate (${latestYearWithGender})`}>
          <BarChart 
            title="" 
            data={governorateBreakdownData} 
            horizontal={true}
            height={350}
          />
        </DashboardCard>
      </div>
      
      <div className="mb-8">
        <DashboardCard title="Homicide & Attempted Homicide by Governorate and Year">
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
                {data.homicideAttemptedHomicideByGovernorate.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`
                      ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                      ${selectedGovernorate === item.governorate_en.toLowerCase().replace(/\s+/g, '') 
                        ? 'bg-red-50 dark:bg-red-900/20' : ''}
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

export default Homicides;