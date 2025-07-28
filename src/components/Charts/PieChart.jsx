// src/components/Charts/PieChart.jsx
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ chartData, chartOptions }) {
    // Set default options 
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left', 
                labels: {
                    boxWidth: 20, 
                    padding: 20,
                },
            },
        },
        cutout: '50%', 
    };

    const options = chartOptions || defaultOptions;

    return <Doughnut options={options} data={chartData} />;
}

export default PieChart;