import React from 'react';
import { useData } from '../context/DataContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import StatCard from '../components/dashboard/StatCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';

const Dashboard: React.FC = () => {
  const { data, loading, yearRange } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-palestine-red"></div>
      </div>
    );
  }

  // Calculate statistics
  const latestYear = 2023;
  const prevYear = 2022;

  const getYearData = (indicator: string, year: number) => {
    const stat = data.crimeJusticeStatisticsPalestine.find(
      item => item.indicator_en === indicator
    );
    return stat ? stat[year.toString() as keyof typeof stat] as number : 0;
  };

  // Prepare data for stats cards
  const colonialSites = {
    total: data.westBankSettlementIndicators?.colonial_sites_2021?.total_sites ?? 0,
    change: {
      value: 5,
      label: 'since last quarter',
      type: 'increase' as const
    }
  };

  const martyrs = {
    total: data.alAqsaIntifadaMartyrs.total,
    latest: data.alAqsaIntifadaMartyrs.years[data.alAqsaIntifadaMartyrs.years.length - 1].count
  };

  const crimeStats = {
    current: getYearData('Reported Criminal Acts', latestYear),
    prev: getYearData('Reported Criminal Acts', prevYear),
    change: ((getYearData('Reported Criminal Acts', latestYear) - 
              getYearData('Reported Criminal Acts', prevYear)) / 
              getYearData('Reported Criminal Acts', prevYear) * 100)
  };

  // Prepare chart data
  const years = Object.keys(data.crimeJusticeStatisticsPalestine[0])
    .filter(key => !isNaN(parseInt(key)) && parseInt(key) >= yearRange[0] && parseInt(key) <= yearRange[1])
    .sort((a, b) => parseInt(a) - parseInt(b));

  const crimeData = {
    labels: years,
    datasets: [
      {
        label: 'Criminal Acts',
        data: years.map(year => {
          const crimeStats = data.crimeJusticeStatisticsPalestine.find(
            item => item.indicator_en === 'Reported Criminal Acts'
          );
          return crimeStats ? crimeStats[year as keyof typeof crimeStats] as number : null;
        }),
        borderColor: 'rgb(238, 42, 53)',
        backgroundColor: 'rgba(238, 42, 53, 0.1)',
        tension: 0.2,
      }
    ]
  };

  const martyrsData = {
    labels: data.alAqsaIntifadaMartyrs.years
      .filter(item => item.year >= yearRange[0] && item.year <= yearRange[1])
      .map(item => item.year.toString()),
    datasets: [
      {
        label: 'Martyrs',
        data: data.alAqsaIntifadaMartyrs.years
          .filter(item => item.year >= yearRange[0] && item.year <= yearRange[1])
          .map(item => item.count),
        backgroundColor: 'rgba(238, 42, 53, 0.8)',
        borderColor: 'rgb(238, 42, 53)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {data.westBankSettlementIndicators && (
          <StatCard
            title="Colonial Sites"
            value={colonialSites.total}
            subtitle="Illegal Israeli settlements"
            change={colonialSites.change}
            icon="location_city"
            aiInsight="AI Predicts a 10% increase in new settlement construction in the next 6 months based on current trends."
          />
        )}

        <StatCard
          title="Safe Water Access"
          value="78%"
          subtitle="Population with access"
          icon="water_drop"
          iconColor="text-palestine-green"
          aiInsight="AI suggests investing in rainwater harvesting could improve access by 5% in rural areas."
        />

        <StatCard
          title="Gaza War Martyrs"
          value="35,000+"
          subtitle="Since Oct 7, 2023"
          icon="personal_injury"
          iconColor="text-palestine-red"
          change={{
            value: 15000,
            label: 'children',
            type: 'increase'
          }}
          aiInsight="AI projects casualty figures could rise significantly if current conflict intensity continues."
        />

        <StatCard
          title="Reported Criminal Acts"
          value={crimeStats.current.toLocaleString()}
          subtitle="In the last 6 months"
          change={{
            value: Math.round(crimeStats.change),
            label: 'from previous period',
            type: crimeStats.change > 0 ? 'increase' : 'decrease'
          }}
          icon="gavel"
          aiInsight="AI indicates petty theft is likely to decrease further with increased community policing initiatives."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Population Overview"
          icon="groups"
          iconColor="text-palestine-green"
          className="lg:col-span-1"
          aiInsight="AI analysis indicates a youth bulge, with 60% of the population under 25."
        >
          <div className="text-4xl font-bold text-palestine-green mb-1">5.4 M</div>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">Total Estimated Population</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary dark:text-dark-text-secondary">West Bank:</span>
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">3.2 M</span>
            </div>
            <div className="w-full bg-medium-gray dark:bg-dark-border rounded-full h-2">
              <div className="bg-palestine-green h-2 rounded-full" style={{ width: '59%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Gaza Strip:</span>
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">2.2 M</span>
            </div>
            <div className="w-full bg-medium-gray dark:bg-dark-border rounded-full h-2">
              <div className="bg-palestine-green h-2 rounded-full" style={{ width: '41%' }}></div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Criminal Acts Trend"
          icon="trending_up"
          className="lg:col-span-2"
          aiInsight="AI predicts a potential 15% reduction in criminal activities with improved security measures."
        >
          <LineChart
            title=""
            data={crimeData}
            height={300}
          />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Martyrs by Year"
          icon="warning"
          iconColor="text-palestine-red"
          aiInsight="AI analysis shows significant correlation between military operations and civilian casualties."
        >
          <BarChart
            title=""
            data={martyrsData}
            height={300}
          />
        </DashboardCard>

        <DashboardCard
          title="Recent Incidents"
          icon="notifications_active"
          iconColor="text-palestine-red"
          aiInsight="AI pattern analysis predicts potential flashpoints near major checkpoints during peak hours."
        >
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {[
              {
                type: 'crisis',
                title: 'Settler Violence Reported in Hebron',
                time: '09:15 AM',
                description: 'Reports of increased settler activity and harassment near Al-Shuhada Street.'
              },
              {
                type: 'warning',
                title: 'Checkpoint Delays at Qalandia',
                time: '02:30 PM',
                description: 'Significant delays causing issues for commuters and humanitarian access.'
              },
              {
                type: 'fire',
                title: 'Agricultural Land Damage in Nablus',
                time: '11:00 AM',
                description: 'Olive groves reportedly damaged by fires near a settlement.'
              }
            ].map((incident, index) => (
              <div
                key={index}
                className={`flex items-start p-3 ${
                  incident.type === 'crisis' 
                    ? 'bg-red-50 dark:bg-red-900/30' 
                    : 'bg-gray-50 dark:bg-dark-hover/50'
                } rounded-lg`}
              >
                <span className={`material-icons-outlined mr-3 mt-1 ${
                  incident.type === 'crisis' 
                    ? 'text-palestine-red' 
                    : 'text-palestine-black dark:text-dark-text-secondary'
                }`}>
                  {incident.type === 'crisis' ? 'crisis_alert' : incident.type === 'warning' ? 'warning_amber' : 'local_fire_department'}
                </span>
                <div>
                  <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                    {incident.title}
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    {new Date().toLocaleDateString('en-US', { 
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })} - {incident.time}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                    {incident.description}
                  </p>
                </div>
                <span className="material-icons-outlined text-dark-gray dark:text-dark-text-secondary ml-auto cursor-pointer">
                  more_vert
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;