import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: (number | null)[];
      backgroundColor: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  height?: number;
  width?: number;
  horizontal?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ title, data, height, width, horizontal }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.raw === null) return 'No data';
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000
    }
  };

  return (
    <div style={{ height: height || 300, width: width || '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;