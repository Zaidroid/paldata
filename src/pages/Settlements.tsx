import React from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import { Building, Users, MapPin, ArrowRight } from 'lucide-react';

const Settlements: React.FC = () => {
  const { data, loading } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const settlementTypes = {
    labels: [
      'Settlements', 
      'Outposts',
      'Inhabited Outposts as Neighborhoods',
      'Other Sites'
    ],
    datasets: [
      {
        label: 'Number of Sites',
        data: [
          data.westBankSettlementIndicators.colonial_sites_2021.settlements,
          data.westBankSettlementIndicators.colonial_sites_2021.outposts,
          data.westBankSettlementIndicators.colonial_sites_2021.inhabited_outposts_as_neighborhoods,
          data.westBankSettlementIndicators.colonial_sites_2021.other_sites
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const populationGrowthData = {
    labels: ['1972', '2021'],
    datasets: [
      {
        label: 'Settler Population in West Bank',
        data: [
          data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_1972,
          data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_2021
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  const wallCompletionData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Annexation/Expansion Wall (km)',
        data: [
          data.westBankSettlementIndicators.annexation_expansion_wall_2017.completed_path_km,
          data.westBankSettlementIndicators.annexation_expansion_wall_2017.total_path_km - 
          data.westBankSettlementIndicators.annexation_expansion_wall_2017.completed_path_km
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(200, 200, 200, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(200, 200, 200, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Settlements in the West Bank</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
            <Building size={24} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Colonial Sites</p>
            <p className="text-2xl font-bold">
              {data.westBankSettlementIndicators.colonial_sites_2021.total_sites}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
            <Users size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Settler Population (2021)</p>
            <p className="text-2xl font-bold">
              {data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_2021.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
            <MapPin size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Settlement Influence Area</p>
            <p className="text-2xl font-bold">
              {data.westBankSettlementIndicators.influence_area_sqkm_2021} km²
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Colonial Sites by Type (2021)">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
            {data.westBankSettlementIndicators.colonial_sites_2021.note_en}
          </p>
          <PieChart 
            title="" 
            data={settlementTypes}
            height={350}
          />
        </DashboardCard>
        
        <DashboardCard title="Settler Population Growth (1972-2021)">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <BarChart 
                title="" 
                data={populationGrowthData}
                height={250}
              />
              <div className="mt-4 flex items-center justify-center">
                <div className="text-left">
                  <p className="font-bold">
                    {data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_1972.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">1972</p>
                </div>
                <ArrowRight size={24} className="mx-4 text-red-500" />
                <div className="text-left">
                  <p className="font-bold">
                    {data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_2021.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">2021</p>
                </div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-red-600">
                  {Math.round(
                    (data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_2021 / 
                    data.westBankSettlementIndicators.settler_population_comparison.settlers_west_bank_1972 - 1) * 100
                  )}%
                </span> increase over 49 years
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Annexation & Expansion Wall (2017)">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <PieChart 
                title="" 
                data={wallCompletionData}
                height={200}
              />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total planned length</p>
                  <p className="text-xl font-bold">
                    {data.westBankSettlementIndicators.annexation_expansion_wall_2017.total_path_km} km
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-xl font-bold text-red-600">
                    {data.westBankSettlementIndicators.annexation_expansion_wall_2017.completed_path_km} km
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ({Math.round(
                      (data.westBankSettlementIndicators.annexation_expansion_wall_2017.completed_path_km / 
                      data.westBankSettlementIndicators.annexation_expansion_wall_2017.total_path_km) * 100
                    )}% of total)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Percentage of settlers inside wall</p>
                  <p className="text-xl font-bold text-red-600">
                    {data.westBankSettlementIndicators.annexation_expansion_wall_2017.percentage_settlers_inside_wall}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Land Area Impact">
          <div className="space-y-6 h-full flex flex-col justify-center">
            <div>
              <h3 className="text-lg font-semibold mb-1">Settlement Influence Area</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full"
                  style={{ width: `${(data.westBankSettlementIndicators.influence_area_sqkm_2021 / data.westBankLandUse2017.data[0].grand_total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>{data.westBankSettlementIndicators.influence_area_sqkm_2021} km²</span>
                <span>
                  {Math.round((data.westBankSettlementIndicators.influence_area_sqkm_2021 / data.westBankLandUse2017.data[0].grand_total) * 100)}% of West Bank
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1">Military Closed Zones</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-orange-500 h-4 rounded-full"
                  style={{ width: `${(data.westBankSettlementIndicators.militarily_closed_zones_sqkm_2021 / data.westBankLandUse2017.data[0].grand_total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>{data.westBankSettlementIndicators.militarily_closed_zones_sqkm_2021} km²</span>
                <span>
                  {Math.round((data.westBankSettlementIndicators.militarily_closed_zones_sqkm_2021 / data.westBankLandUse2017.data[0].grand_total) * 100)}% of West Bank
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1">Area C (Israeli Control)</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${(data.westBankLandUse2017.data[0].area_C / data.westBankLandUse2017.data[0].grand_total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>{data.westBankLandUse2017.data[0].area_C} km²</span>
                <span>
                  {Math.round((data.westBankLandUse2017.data[0].area_C / data.westBankLandUse2017.data[0].grand_total) * 100)}% of West Bank
                </span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="mb-8">
        <DashboardCard title="Sources">
          <div className="space-y-2">
            {data.westBankSettlementIndicators.sources_en.map((source, index) => (
              <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                {index + 1}. {source}
              </p>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Settlements;