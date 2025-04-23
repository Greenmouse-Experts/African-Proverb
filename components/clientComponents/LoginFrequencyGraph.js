import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LoginFrequencyGraph({ selectedPeriod }) {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Login Frequency (Black)",
                data: [50000, 100000, 200000, 150000, 300000, 400000, 500000],
                borderColor: "black",
                fill: false,
                tension: 0.2,
            },
            {
                label: "Login Frequency (Blue)",
                data: [30000, 70000, 150000, 120000, 250000, 350000, 450000],
                borderColor: "blue",
                fill: false,
                tension: 0.2,
                borderDash: [5, 5],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Login Frequency (${selectedPeriod})`,
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Login Frequency</h2>
            <div className="flex justify-between items-center mb-4">
                <span>{selectedPeriod}</span>
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="p-2 border rounded-lg"
                >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}
