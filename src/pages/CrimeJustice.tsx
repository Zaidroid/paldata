import React from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import YearRangeSlider from '../components/YearRangeSlider';

const CrimeJustice: React.FC = () => {
  const { data, loading, yearRange } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const colors = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)',
  ];

  const years = Object.keys(data.crimeJusticeStatisticsPalestine[0])
    .filter(key => !isNaN(parseInt(key)) && parseInt(key) >= yearRange[0] && parseInt(key) <= yearRange[1])
    .sort((a, b) => parseInt(a) - parseInt(b));

  const crimeCategories = [
    'Reported Criminal Acts',
    'Reported Drug Crimes',
    'Reported Homicide and Attempted Homicide',
    'Reported Theft Crimes',
    'Reported Assault Crimes',
  ];

  const crimesData = {
    labels: years,
    datasets: crimeCategories.map((category, index) => {
      const statData = data.crimeJusticeStatisticsPalestine.find(
        item => item.indicator_en === category
      );
      
      return {
        label: category,
        data: years.map(year => statData ? statData[year as keyof typeof statData] as number : null),
        borderColor: colors[index % colors.length].replace('0.6', '1'),
        backgroundColor: colors[index % colors.length],
        fill: false,
        tension: 0.1,
      };
    })
  };

  const prisonData = {
    labels: years,
    datasets: [
      {
        label: 'Detainees in Prisons',
        data: years.map(year => {
          const prisonsData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Detainees in Prisons'
          );
          return prisonsData ? prisonsData[year as keyof typeof prisonsData] as number : null;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Convicts in Prisons',
        data: years.map(year => {
          const convictsData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Convicts in Prisons'
          );
          return convictsData ? convictsData[year as keyof typeof convictsData] as number : null;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const courtCasesData = {
    labels: years,
    datasets: [
      {
        label: 'Received Court Cases',
        data: years.map(year => {
          const courtData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Number of Received Court Cases'
          );
          return courtData ? courtData[year as keyof typeof courtData] as number : null;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Adjudicated Court Cases',
        data: years.map(year => {
          const adjudicatedData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Number of Adjudicated Court Cases'
          );
          return adjudicatedData ? adjudicatedData[year as keyof typeof adjudicatedData] as number : null;
        }),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Rolled-over Court Cases',
        data: years.map(year => {
          const rolledOverData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Number of Rolled-over Court Cases'
          );
          return rolledOverData ? rolledOverData[year as keyof typeof rolledOverData] as number : null;
        }),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      }
    ]
  };

  const juvenilesData = {
    labels: years,
    datasets: [
      {
        label: 'Accused Juveniles',
        data: years.map(year => {
          const accusedData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Accused Juveniles'
          );
          return accusedData ? accusedData[year as keyof typeof accusedData] as number : null;
        }),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Juveniles in Correctional Institutions',
        data: years.map(year => {
          const institutionsData = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Juveniles Placed in Correctional Institutions'
          );
          return institutionsData ? institutionsData[year as keyof typeof institutionsData] as number : null;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Crime & Justice Statistics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <DashboardCard title="Crime Categories Over Time">
            <LineChart 
              title="" 
              data={crimesData} 
            />
          </DashboardCard>
        </div>
        <div>
          <YearRangeSlider />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Prison Population">
          <BarChart 
            title="" 
            data={prisonData} 
          />
        </DashboardCard>
        
        <DashboardCard title="Juvenile Justice">
          <BarChart 
            title="" 
            data={juvenilesData} 
          />
        </DashboardCard>
      </div>
      
      <div className="mb-6">
        <DashboardCard title="Court Cases">
          <LineChart 
            title="" 
            data={courtCasesData} 
          />
        </DashboardCard>
      </div>
      
      <div className="mb-8">
        <DashboardCard title="Road Accident Statistics">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-right">Total Accidents</th>
                  <th className="px-4 py-2 text-right">Material Damage Only</th>
                  <th className="px-4 py-2 text-right">Causing Injuries</th>
                  <th className="px-4 py-2 text-right">Injured Persons</th>
                </tr>
              </thead>
              <tbody>
                {years.map((year, index) => {
                  const totalAccidents = data.crimeJusticeStatisticsPalestine.find(
                    item => item.indicator_en === 'Total Road Accidents'
                  );
                  const materialDamage = data.crimeJusticeStatisticsPalestine.find(
                    item => item.indicator_en === 'Road Accidents Causing Material Damage Only'
                  );
                  const causingInjuries = data.crimeJusticeStatisticsPalestine.find(
                    item => item.indicator_en === 'Road Accidents Causing Injuries'
                  );
                  const injuredPersons = data.crimeJusticeStatisticsPalestine.find(
                    item => item.indicator_en === 'Injured in Road Accidents'
                  );
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                      <td className="px-4 py-2">{year}</td>
                      <td className="px-4 py-2 text-right">
                        {totalAccidents ? totalAccidents[year as keyof typeof totalAccidents] as number || '-' : '-'}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {materialDamage ? materialDamage[year as keyof typeof materialDamage] as number || '-' : '-'}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {causingInjuries ? causingInjuries[year as keyof typeof causingInjuries] as number || '-' : '-'}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {injuredPersons ? injuredPersons[year as keyof typeof injuredPersons] as number || '-' : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default CrimeJustice;