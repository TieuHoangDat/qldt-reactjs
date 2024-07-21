import React from 'react';
import { Pie } from 'react-chartjs-2';

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
  plugins: {
    title: {
      display: true,
      text: 'Biểu đồ tròn',
    },
    legend: {
      position: 'top',
    },
  },
};

const MyPieChart = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default MyPieChart;
