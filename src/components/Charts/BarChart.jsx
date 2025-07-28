// src/components/Charts/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Components that I will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ chartData, chartOptions }) {
  // Set default options 
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: false, 
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false, 
        },
      },
      x: {
        grid: {
          display: false, 
        },
      },
    },
  };

  const options = chartOptions || defaultOptions;

  return <Bar options={options} data={chartData} />;
}

export default BarChart;