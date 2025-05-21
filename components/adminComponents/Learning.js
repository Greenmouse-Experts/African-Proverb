"use client";

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LearningDashboard = () => {
  // Data for Time Spent on Learning Module (Bar Chart)
  const timeSpentData = {
    labels: ['quizzes', 'Proverbs', 'Explanations'],
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: [35, 45, 20],
        backgroundColor: ['#6b7280', '#10b981', '#1e293b'],
        borderRadius: 5,
      },
    ],
  };

  // Data for Language Preference Trends (Line Chart)
  const languageTrendsData = {
    labels: ['Yoruba', 'Hausa', 'Fulani', 'Efik', 'Lingala', 'Somali'],
    datasets: [
      {
        label: 'Preference',
        data: [10, 20, 30, 40, 25, 15],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointRadius: 6,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  // Data for Shared Proverbs (Grouped Bar Chart)
  const sharedProverbsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Within App',
        data: [10, 15, 20, 25, 30, 25, 20],
        backgroundColor: '#10b981',
      },
      {
        label: 'Outside App',
        data: [5, 10, 15, 20, 10, 15, 10],
        backgroundColor: '#a3e4d7',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: { stepSize: 10 },
      },
    },
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-6 mt-6">
        {/* Time Spent on Learning Module Card */}
        <div className="bg-white rounded-lg p-4 w-full md:w-[32%] border border-gray-100">
          <h3 className="text-lg font-meduim text-gray-900 mb-4">Time Spent on Learning Module</h3>
          <Bar data={timeSpentData} options={options} />
        </div>

        {/* Language Preference Trends Card */}
        <div className="bg-white rounded-lg p-4 w-full md:w-[32%] border border-gray-100">
          <h3 className="text-lg font-meduim text-gray-900 mb-4">Language Preference Trends</h3>
          <Line data={languageTrendsData} options={options} />
        </div>

        {/* Shared Proverbs Card */}
        <div className="bg-white rounded-lg p-4 w-full md:w-[32%] border border-gray-100">
          <h3 className="text-lg font-meduim text-gray-900 mb-4">Shared Proverbs</h3>
          <div className="flex justify-end mb-2">
            <select className="text-sm text-gray-500 bg-transparent border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>This Year</option>
              <option>This Month</option>
            </select>
          </div>
          <Bar data={sharedProverbsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;