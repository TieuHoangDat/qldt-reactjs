import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Đã dạy', 'Trong tuần', 'Chưa dạy'],
  datasets: [
    {
      label: 'Số lượng',
      data: [80, 8, 32], // Thay đổi dữ liệu ở đây
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Đảm bảo biểu đồ không bị thay đổi tỉ lệ
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ cột',
    },
  },
};

const MyBarChart = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MyBarChart;
