'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguagePreferencesChart = () => {
  const data = {
    labels: ['Hausa', 'Yoruba', 'Igbo', 'Ijaw'],
    datasets: [
      {
        data: [48.33, 25, 10, 8],
        backgroundColor: ['#728a3c', '#c99b3c', '#b93a32', '#8c75e8'],
        hoverBackgroundColor: ['#5e722f', '#a57f2e', '#962b23', '#7460d6'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-black mb-4">Language Preferences Breakdown</h2>
      <div className="flex items-center">
        {/* Pie Chart */}
        <div className="w-1/2">
          <Pie data={data} />
        </div>
        <div className="w-1/3 flex flex-col space-y-2">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></span>
              <span className="text-gray-600">{label}</span>
              <span className="font-bold text-black ml-auto">
                {data.datasets[0].data[index]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePreferencesChart;
