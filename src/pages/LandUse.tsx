import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import PieChart from '../components/charts/PieChart';

const LandUse: React.FC = () => {
  const { data, loading } = useData();
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('West Bank');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const governorateData = data.westBankLandUse2017.data.find(
    item => item.governorate_en === selectedGovernorate
  );

  const areaLabels = ['Area A', 'Area B', 'Area C', 'Other'];
  const areaData = governorateData ? [
    governorateData.area_A,
    governorateData.area_B,
    governorateData.area_C,
    governorateData.other_total
  ] : [0, 0, 0, 0];

  const pieChartData = {
    labels: areaLabels,
    datasets: [
      {
        label: 'Land Area (km²)',
        data: areaData,
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">West Bank Land Use (2017)</h1>
      
      <div className="mb-6">
        <DashboardCard title={data.westBankLandUse2017.title_en}>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Area Classification Definitions</h3>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-medium">Area A</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.westBankLandUse2017.definitions.area_A_en}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-medium">Area B</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.westBankLandUse2017.definitions.area_B_en}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-medium">Area C</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.westBankLandUse2017.definitions.area_C_en}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500 flex-shrink-0 mt-1"></div>
                <div>
                  <p className="font-medium">Other Areas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Including Jerusalem J1 ({data.westBankLandUse2017.definitions.jerusalem_J1_en.split('...')[0]}...), 
                    Hebron H2 ({data.westBankLandUse2017.definitions.hebron_H2_en}), 
                    Nature Reserves, and undefined territories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DashboardCard title={`Land Area Distribution in ${selectedGovernorate}`}>
            <PieChart 
              title="" 
              data={pieChartData} 
              height={350}
            />
          </DashboardCard>
        </div>
        
        <div>
          <DashboardCard title="Select Governorate">
            <div className="space-y-2">
              {data.westBankLandUse2017.data.map((item) => (
                <button
                  key={item.governorate_en}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors
                    ${selectedGovernorate === item.governorate_en
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  onClick={() => setSelectedGovernorate(item.governorate_en)}
                >
                  {item.governorate_en}
                </button>
              ))}
            </div>
          </DashboardCard>

          {governorateData && (
            <div className="mt-6">
              <DashboardCard title="Land Area Details">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Area</p>
                    <p className="text-2xl font-bold">{governorateData.grand_total} km²</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Area A</p>
                      <p className="text-lg font-semibold">{governorateData.area_A} km²</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((governorateData.area_A / governorateData.grand_total) * 100)}% of total
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Area B</p>
                      <p className="text-lg font-semibold">{governorateData.area_B} km²</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((governorateData.area_B / governorateData.grand_total) * 100)}% of total
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Area C</p>
                      <p className="text-lg font-semibold">{governorateData.area_C} km²</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((governorateData.area_C / governorateData.grand_total) * 100)}% of total
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Other</p>
                      <p className="text-lg font-semibold">{governorateData.other_total} km²</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((governorateData.other_total / governorateData.grand_total) * 100)}% of total
                      </p>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <DashboardCard title="West Bank Land Area by Governorate">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Governorate</th>
                  <th className="px-4 py-2 text-right">Area A (km²)</th>
                  <th className="px-4 py-2 text-right">Area B (km²)</th>
                  <th className="px-4 py-2 text-right">Area C (km²)</th>
                  <th className="px-4 py-2 text-right">Other (km²)</th>
                  <th className="px-4 py-2 text-right">Total (km²)</th>
                </tr>
              </thead>
              <tbody>
                {data.westBankLandUse2017.data.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                      ${selectedGovernorate === item.governorate_en ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                    onClick={() => setSelectedGovernorate(item.governorate_en)}
                  >
                    <td className="px-4 py-2 cursor-pointer">{item.governorate_en}</td>
                    <td className="px-4 py-2 text-right">{item.area_A}</td>
                    <td className="px-4 py-2 text-right">{item.area_B}</td>
                    <td className="px-4 py-2 text-right">{item.area_C}</td>
                    <td className="px-4 py-2 text-right">{item.other_total}</td>
                    <td className="px-4 py-2 text-right font-bold">{item.grand_total}</td>
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

export default LandUse;