import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: (number | null)[];
      borderColor: string;
      backgroundColor: string;
      fill?: boolean;
      tension?: number;
    }[];
  };
  height?: number;
  width?: number;
}

const LineChart: React.FC<LineChartProps> = ({ title, data, height, width }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.8,
        to: 0.2,
        loop: false
      }
    }
  };

  return (
    <div style={{ height: height || 300, width: width || '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;